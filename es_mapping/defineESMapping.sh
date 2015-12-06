curl -XPUT 'http://localhost:9200/biodiversity/' -d '
{
	"settings": {
		"analysis": {
			"filter": {
				"nGram_filter": {
					"type": "nGram",
					"min_gram": "2",
					"max_gram": "20",
					"token_chars": ["letter", "digit", "punctuation", "symbol"]
				},
				"snowball": {
					"type": "snowball",
					"language": "Spanish"
				},
				"stopwords": {
					"type": "stop",
					"stopwords": "_spanish_"
				},
				"worddelimiter": {
					"type": "word_delimiter"
				},
				"my_shingle_filter": {
					"type": "shingle",
					"min_shingle_size": "2",
					"max_shingle_size": "5",
					"output_unigrams": "false",
					"output_unigrams_if_no_shingles": "false"
				},
				"my_ascii_folding": {
					"type" : "asciifolding",
					"preserve_original": true
				}
			},
			"analyzer": {
				"spanish_ngram_analyzer": {
					"type": "custom",
					"tokenizer": "whitespace",
					"filter": ["lowercase", "stopwords", "my_ascii_folding", "nGram_filter"]
				},
				"spanish_search_analyzer": {
					"type": "custom",
					"tokenizer": "standard",
					"filter": ["lowercase", "stopwords", "my_ascii_folding", "snowball", "worddelimiter"]
				},
				"my_shingle_analyzer": {
					"type": "custom",
					"tokenizer": "standard",
					"filter": ["lowercase", "my_shingle_filter"]
				},
				"string_lowercase": {
					"tokenizer": "keyword",
					"filter": ["lowercase"]
				}
			}
		}
	}
}'

curl -XPUT 'http://localhost:9200/biodiversity/_mapping/catalog' -d '
{
	"catalog":  {
		"properties": {
			"catalogoEspeciesId": {
				"type": "long"
			},
			"fechaActualizacion": {
				"type": "date"
			},
			"fechaElaboracion": {
				"type": "date"
			},
			"tituloMetadato": {
				"type": "string",
				"index": "not_analyzed"
			},
			"jerarquiaNombresComunes": {
				"type": "string",
				"index": "not_analyzed"
			},
			"active": {
				"type" : "integer"
			},
			"licenciaInfo": {
				"type": "string",
				"index": "analyzed",
				"fields" : {
					"untouched" : {
						"type": "string",
						"index": "not_analyzed"
					},
					"exactWords": {
						"type": "string",
						"analyzer": "string_lowercase"
					}
				}
			},
			"taxonNombre": {
				"type": "string",
				"index": "analyzed",
				"fields" : {
					"untouched": {
						"type": "string",
						"index": "not_analyzed"
					},
					"exactWords": {
						"type": "string",
						"analyzer": "string_lowercase"
					},
					"spanish": {
						"type": "string",
						"analyzer": "spanish_search_analyzer"
					},
					"suggest": {
						"type": "completion",
						"analyzer": "simple",
						"search_analyzer": "simple",
						"payloads": true
					}
				}
			},
			"taxonCompleto": {
				"type": "string",
				"index": "analyzed",
				"fields" : {
					"untouched": {
						"type": "string",
						"index": "not_analyzed"
					},
					"exactWords": {
						"type": "string",
						"analyzer": "string_lowercase"
					},
					"spanish": {
						"type": "string",
						"analyzer": "spanish_search_analyzer"
					},
					"suggest": {
						"type": "completion",
						"analyzer": "simple",
						"search_analyzer": "simple",
						"payloads": true
					}
				}
			},
			"taxonomia": {
				"properties": {
					"reino": {
						"type": "string",
						"index": "analyzed",
						"fields": {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							},
							"spanish": {
								"type": "string",
								"analyzer": "spanish_search_analyzer"
							},
							"suggest": {
								"type": "completion",
								"analyzer": "simple",
								"search_analyzer": "simple",
								"payloads": true
							}
						}
					},
					"filo": {
						"type": "string",
						"index": "analyzed",
						"fields" : {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							},
							"spanish": {
								"type": "string",
								"analyzer": "spanish_search_analyzer"
							},
							"suggest": {
								"type": "completion",
								"analyzer": "simple",
								"search_analyzer": "simple",
								"payloads": true
							}
						}
					},
					"clase": {
						"type": "string",
						"index": "analyzed",
						"fields" : {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							},
							"spanish": {
								"type": "string",
								"analyzer": "spanish_search_analyzer"
							},
							"suggest": {
								"type": "completion",
								"analyzer": "simple",
								"search_analyzer": "simple",
								"payloads": true
							}
						}
					},
					"orden": {
						"type": "string",
						"index": "analyzed",
						"fields" : {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							},
							"spanish": {
								"type": "string",
								"analyzer": "spanish_search_analyzer"
							},
							"suggest": {
								"type": "completion",
								"analyzer": "simple",
								"search_analyzer": "simple",
								"payloads": true
							}
						}
					},
					"familia": {
						"type": "string",
						"index": "analyzed",
						"fields" : {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							},
							"spanish": {
								"type": "string",
								"analyzer": "spanish_search_analyzer"
							},
							"suggest": {
								"type": "completion",
								"analyzer": "simple",
								"search_analyzer": "simple",
								"payloads": true
							}
						}
					},
					"genero": {
						"type": "string",
						"index": "analyzed",
						"fields" : {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							},
							"spanish": {
								"type": "string",
								"analyzer": "spanish_search_analyzer"
							},
							"suggest": {
								"type": "completion",
								"analyzer": "simple",
								"search_analyzer": "simple",
								"payloads": true
							}
						}
					},
					"epitetoEspecifico": {
						"type": "string",
						"index": "analyzed",
						"fields" : {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							},
							"spanish": {
								"type": "string",
								"analyzer": "spanish_search_analyzer"
							},
							"suggest": {
								"type": "completion",
								"analyzer": "simple",
								"search_analyzer": "simple",
								"payloads": true
							}
						}
					},
					"especie": {
						"type": "string",
						"index": "analyzed",
						"fields" : {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							},
							"spanish": {
								"type": "string",
								"analyzer": "spanish_search_analyzer"
							},
							"suggest": {
								"type": "completion",
								"analyzer": "simple",
								"search_analyzer": "simple",
								"payloads": true
							}
						}
					}
				}
			},
			"paginaweb": {
				"type": "string",
				"index": "not_analyzed"
			},
			"autor": {
				"type": "string",
				"index": "analyzed",
				"fields": {
					"untouched": {
						"type": "string",
						"index": "not_analyzed"
					},
					"exactWords": {
						"type": "string",
						"analyzer": "string_lowercase"
					},
					"spanish": {
						"type": "string",
						"analyzer": "spanish_search_analyzer"
					},
					"suggest": {
						"type": "completion",
						"analyzer": "simple",
						"search_analyzer": "simple",
						"payloads": true
					}
				}
			},
			"verificacion": {
				"properties": {
					"email": {
						"type": "string",
						"index": "not_analyzed"
					},
					"emailResponsable": {
						"type": "string",
						"index": "not_analyzed"
					},
					"fecha": {
						"type": "date"
					},
					"estadoId": {
						"type": "long"
					},
					"nombre": {
						"type": "string",
						"index": "analyzed",
						"fields" : {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							}
						}
					},
					"descripcion": {
						"type": "string",
						"index": "not_analyzed"
					},
					"validoInd": {
						"type": "boolean"
					}
				}
			},
			"citacion": {
				"properties": {
					"citacionId": {
						"type": "long"
					},
					"sistemaclasificacionInd": {
						"type": "boolean"
					},
					"fecha": {
						"type":   "date",
          	"format": "yyyy"
					},
					"documentoTitulo": {
						"type": "string",
						"index": "analyzed",
						"fields": {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							},
							"spanish": {
								"type": "string",
								"analyzer": "spanish_search_analyzer"
							}
						}
					},
					"autor": {
						"type": "string",
						"index": "analyzed",
						"fields": {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							},
							"spanish": {
								"type": "string",
								"analyzer": "spanish_search_analyzer"
							}
						}
					},
					"editor": {
						"type": "string",
						"index": "not_analyzed"
					},
					"publicador": {
						"type": "string",
						"index": "analyzed",
						"fields": {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							},
							"spanish": {
								"type": "string",
								"analyzer": "spanish_search_analyzer"
							}
						}
					},
					"editorial": {
						"type": "string",
						"index": "not_analyzed"
					},
					"lugarPublicacion": {
						"type": "string",
						"index": "not_analyzed"
					},
					"edicionVersion": {
						"type": "string",
						"index": "not_analyzed"
					},
					"volumen": {
						"type": "string",
						"index": "not_analyzed"
					},
					"serie": {
						"type": "string",
						"index": "not_analyzed"
					},
					"numero": {
						"type": "string",
						"index": "not_analyzed"
					},
					"paginas": {
						"type": "string",
						"index": "not_analyzed"
					},
					"hipervinculo": {
						"type": "string",
						"index": "not_analyzed"
					},
					"fechaActualizacion": {
						"type": "date"
					},
					"fechaConsulta": {
						"type": "date"
					},
					"otros": {
						"type": "string",
						"index": "not_analyzed"
					},
					"tipoId": {
						"type": "long"
					},
					"tipoNombre": {
						"type": "string",
						"index": "not_analyzed"
					},
					"tipoSuperiorInd": {
						"type": "boolean"
					},
					"tipoSerieSuperiorInd": {
						"type": "boolean"
					}
				}
			},
			"contacto": {
				"properties": {
					"contactoId": {
						"type": "long"
					},
					"direccion": {
						"type": "string",
						"index": "not_analyzed"
					},
					"telefono": {
						"type": "string",
						"index": "not_analyzed"
					},
					"acronimo": {
						"type": "string",
						"index": "analyzed",
						"fields": {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							},
							"spanish": {
								"type": "string",
								"analyzer": "spanish_search_analyzer"
							}
						}
					},
					"persona": {
						"type": "string",
						"index": "analyzed",
						"fields": {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							},
							"spanish": {
								"type": "string",
								"analyzer": "spanish_search_analyzer"
							}
						}
					},
					"fax": {
						"type": "string",
						"index": "not_analyzed"
					},
					"correoElectronico": {
						"type": "string",
						"index": "not_analyzed"
					},
					"organizacion": {
						"type": "string",
						"index": "analyzed",
						"fields": {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							},
							"spanish": {
								"type": "string",
								"analyzer": "spanish_search_analyzer"
							}
						}
					},
					"cargo": {
						"type": "string",
						"index": "not_analyzed"
					},
					"instrucciones": {
						"type": "string",
						"index": "not_analyzed"
					},
					"horaInicial": {
						"type": "date"
					},
					"horaFinal": {
						"type": "date"
					},
					"idReferenteGeografico": {
						"type": "long"
					},
					"poblacionDane": {
						"type": "string",
						"index": "not_analyzed"
					},
					"intruccionesAcceso": {
						"type": "string",
						"index": "not_analyzed"
					},
					"localidadHistorica": {
						"type": "string",
						"index": "not_analyzed"
					},
					"paisAbreviatura": {
						"type": "string",
						"index": "not_analyzed"
					},
					"paisNombre": {
						"type": "string",
						"index": "not_analyzed"
					},
					"subAbreviatura": {
						"type": "string",
						"index": "not_analyzed"
					},
					"subNombre": {
						"type": "string",
						"index": "not_analyzed"
					},
					"saDane": {
						"type": "string",
						"index": "not_analyzed"
					},
					"tipoSubId": {
						"type": "long"
					},
					"tipoSubNombre": {
						"type": "string",
						"index": "not_analyzed"
					},
					"ciudadMunicipioAbreviatura": {
						"type": "string",
						"index": "not_analyzed"
					},
					"ciudadMunicipioNombre": {
						"type": "string",
						"index": "not_analyzed"
					},
					"ciudadMunicipioDane": {
						"type": "string",
						"index": "not_analyzed"
					}
				}
			},
			"listaNombresComunes": {
				"type": "string",
				"index": "analyzed",
				"fields": {
					"untouched": {
						"type": "string",
						"index": "not_analyzed"
					},
					"exactWords": {
						"type": "string",
						"analyzer": "string_lowercase"
					},
					"spanish": {
						"type": "string",
						"analyzer": "spanish_search_analyzer"
					},
					"suggest": {
						"type": "completion",
						"analyzer": "simple",
						"search_analyzer": "simple",
						"payloads": true
					}
				}
			},
			"nombresComunes": {
				"type": "nested",
				"properties": {
					"tesauroId": {
						"type": "long"
					},
					"tesauroNombre": {
						"type": "string",
						"index": "analyzed",
						"fields": {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							},
							"spanish": {
								"type": "string",
								"analyzer": "spanish_search_analyzer"
							},
							"suggest": {
								"type": "completion",
								"analyzer": "simple",
								"search_analyzer": "simple",
								"payloads": true
							}
						}
					},
					"grupoHumano": {
						"type": "string",
						"index": "analyzed",
						"fields" : {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							},
							"spanish": {
								"type": "string",
								"analyzer": "spanish_search_analyzer"
							}
						}
					},
					"idioma": {
						"type": "string",
						"index": "not_analyzed"
					},
					"regionesGeograficas": {
						"type": "string",
						"index": "analyzed",
						"fields" : {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							},
							"spanish": {
								"type": "string",
								"analyzer": "spanish_search_analyzer"
							}
						}
					},
					"paginaWeb": {
						"type": "string",
						"index": "not_analyzed"
					},
					"tesauroCompleto": {
						"type": "string",
						"index": "analyzed",
						"fields" : {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							},
							"spanish": {
								"type": "string",
								"analyzer": "spanish_search_analyzer"
							}
						}
					}
				}
			},
			"distribucionGeografica": {
				"properties": {
					"departamentos": {
						"type": "string",
						"index": "analyzed",
						"fields": {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							},
							"spanish": {
								"type": "string",
								"analyzer": "spanish_search_analyzer"
							},
							"suggest": {
								"type": "completion",
								"analyzer": "simple",
								"search_analyzer": "simple",
								"payloads": true
							}
						}
					},
					"regionesNaturales": {
						"type": "string",
						"index": "analyzed",
						"fields": {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							},
							"spanish": {
								"type": "string",
								"analyzer": "spanish_search_analyzer"
							},
							"suggest": {
								"type": "completion",
								"analyzer": "simple",
								"search_analyzer": "simple",
								"payloads": true
							}
						}
					},
					"corporacionesAutonomasRegionales": {
						"type": "string",
						"index": "analyzed",
						"fields": {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							},
							"spanish": {
								"type": "string",
								"analyzer": "spanish_search_analyzer"
							},
							"suggest": {
								"type": "completion",
								"analyzer": "simple",
								"search_analyzer": "simple",
								"payloads": true
							}
						}
					},
					"organizaciones": {
						"type": "string",
						"index": "analyzed",
						"fields": {
							"untouched": {
								"type": "string",
								"index": "not_analyzed"
							},
							"exactWords": {
								"type": "string",
								"analyzer": "string_lowercase"
							},
							"spanish": {
								"type": "string",
								"analyzer": "spanish_search_analyzer"
							},
							"suggest": {
								"type": "completion",
								"analyzer": "simple",
								"search_analyzer": "simple",
								"payloads": true
							}
						}
					}
				}
			}
		}
	}
}'