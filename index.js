'use strict';

// Import required libraroes
var pg = require('pg');
var _ = require('lodash');
var async = require('async');

var conString = 'postgres://postgres:h4s1p8k2@localhost/catalogo';

var client = new pg.Client(conString);
client.connect(function(err) {
	if(err) {
		return console.error('could not connect to postgres', err);
	}
	client.query('SELECT DISTINCT \
		"public".catalogoespecies.catalogoespecies_id, \
		"public".catalogoespecies.fechaactualizacion, \
		"public".catalogoespecies.fechaelaboracion, \
		"public".catalogoespecies.titulometadato, \
		"public".catalogoespecies.jerarquianombrescomunes, \
		"public".catalogoespecies.active, \
		"public".catalogoespecies."licenciaInfo", \
		"public".pcaat_ce.taxonnombre, \
		"public".pcaat_ce.taxoncompleto, \
		"public".pcaat_ce.paginaweb, \
		"public".pcaat_ce.autor AS pcaat_ce_autor, \
		"public".verificacionce.contacto_id AS email_verifica, \
		"public".verificacionce.contactoresponsable_id AS email_responsable_verifica, \
		"public".verificacionce.fecha AS fecha_verifica, \
		"public".verificacionce.comentarios AS comentario_verifica, \
		"public".estadoverificacion.estado_id AS verificado_estado_id, \
		"public".estadoverificacion.nombre AS verificado_nombre, \
		"public".estadoverificacion.descripcion AS verificado_descripcion, \
		"public".estadoverificacion.valido_ind AS verificado_valido_ind, \
		"public".citacion.citacion_id AS citacion_citacion_id, \
		"public".citacion.sistemaclasificacion_ind AS citacion_sistemaclasificacion_ind, \
		"public".citacion.fecha AS citacion_fecha, \
		"public".citacion.documento_titulo AS citacion_documento_titulo, \
		"public".citacion.autor AS citacion_autor, \
		"public".citacion.editor AS citacion_editor, \
		"public".citacion.publicador AS citacion_publicador, \
		"public".citacion.editorial AS citacion_editorial, \
		"public".citacion.lugar_publicacion AS citacion_lugar_publicacion, \
		"public".citacion.edicion_version AS citacion_edicion_version, \
		"public".citacion.volumen AS citacion_volumen, \
		"public".citacion.serie AS citacion_serie, \
		"public".citacion.numero AS citacion_numero, \
		"public".citacion.paginas AS citacion_paginas, \
		"public".citacion.hipervinculo AS citacion_hipervinculo, \
		"public".citacion.fecha_actualizacion AS citacion_fecha_actualizacion, \
		"public".citacion.fecha_consulta AS citacion_fecha_consulta, \
		"public".citacion.otros AS citacion_otros, \
		"public".citaciontipo.citaciontipo_id AS citaciontipo_citaciontipo_id, \
		"public".citaciontipo.citaciontipo_nombre AS citaciontipo_citaciontipo_nombre, \
		"public".citaciontipo.citacionsuperior_ind AS citaciontipo_citacionsuperior_ind, \
		"public".citaciontipo.serie_o_citacionsuperior_ind AS citaciontipo_serie_o_citacionsuperior_ind, \
		"public".contactos.contacto_id AS contactos_contacto_id, \
		"public".contactos.direccion AS contactos_direccion, \
		"public".contactos.telefono AS contactos_telefono, \
		"public".contactos.acronimo AS contactos_acronimo, \
		"public".contactos.persona AS contactos_persona, \
		"public".contactos.fax AS contactos_fax, \
		"public".contactos.correo_electronico AS contactos_correo_electronico, \
		"public".contactos.organizacion AS contactos_organizacion, \
		"public".contactos.cargo AS contactos_cargo, \
		"public".contactos.instrucciones AS contactos_instrucciones, \
		"public".contactos.hora_inicial AS contactos_hora_inicial, \
		"public".contactos.hora_final AS contactos_hora_final, \
		"public".referentegeografico.id_referente_geografico AS referentegeografico_id_referente_geografico, \
		"public".referentegeografico.poblacion_dane AS referentegeografico_poblacion_dane, \
		"public".referentegeografico.intruccionesacceso AS referentegeografico_intruccionesacceso, \
		"public".referentegeografico.localidadhistorica AS referentegeografico_localidadhistorica, \
		"public".pais.pais_abreviatura AS pais_pais_abreviatura, \
		"public".pais.pais_nombre AS pais_pais_nombre, \
		"public".subadministrativa.sub_abreviatura AS subadministrativa_sub_abreviatura, \
		"public".subadministrativa.sub_nombre AS subadministrativa_sub_nombre, \
		"public".subadministrativa.sa_dane AS subadministrativa_sa_dane, \
		"public".tiposub.tiposub_id AS tiposub_tiposub_id, \
		"public".tiposub.tiposub_nombre AS tiposub_tiposub_nombre, \
		"public".ciudadmunicipio.ciudad_municipio_abreviatura AS ciudadmunicipio_ciudad_municipio_abreviatura, \
		"public".ciudadmunicipio.ciudad_municipio_nombre AS ciudadmunicipio_ciudad_municipio_nombre, \
		"public".ciudadmunicipio.cm_dane AS ciudadmunicipio_cm_dane \
		FROM \
		"public".catalogoespecies \
		INNER JOIN "public".pcaat_ce ON "public".pcaat_ce.catalogoespecies_id = "public".catalogoespecies.catalogoespecies_id \
		INNER JOIN "public".verificacionce ON "public".verificacionce.catalogoespecies_id = "public".catalogoespecies.catalogoespecies_id \
		INNER JOIN "public".estadoverificacion ON "public".verificacionce.estado_id = "public".estadoverificacion.estado_id \
		INNER JOIN "public".citacion ON "public".catalogoespecies.citacion_id = "public".citacion.citacion_id \
		INNER JOIN "public".citaciontipo ON "public".citacion.citaciontipo_id = "public".citaciontipo.citaciontipo_id \
		INNER JOIN "public".contactos ON "public".catalogoespecies.contacto_id = "public".contactos.contacto_id \
		INNER JOIN "public".referentegeografico ON "public".contactos.id_referente_geografico = "public".referentegeografico.id_referente_geografico \
		INNER JOIN "public".pais ON "public".referentegeografico.id_pais = "public".pais.pais_abreviatura \
		INNER JOIN "public".subadministrativa ON "public".subadministrativa.pais_abreviatura = "public".pais.pais_abreviatura \
		INNER JOIN "public".tiposub ON "public".subadministrativa.tiposub_id = "public".tiposub.tiposub_id \
		INNER JOIN "public".ciudadmunicipio ON "public".ciudadmunicipio.pais_abreviatura = "public".subadministrativa.pais_abreviatura AND "public".ciudadmunicipio.sub_abreviatura = "public".subadministrativa.sub_abreviatura AND "public".referentegeografico.id_pais = "public".ciudadmunicipio.pais_abreviatura AND "public".referentegeografico.id_sub = "public".ciudadmunicipio.sub_abreviatura AND "public".referentegeografico.id_cm = "public".ciudadmunicipio.ciudad_municipio_abreviatura \
		WHERE \
		"public".pcaat_ce.taxonnombre IS NOT NULL AND \
		"public".pcaat_ce.taxoncompleto IS NOT NULL AND \
		"public".catalogoespecies.catalogoespecies_id = 464 \
		ORDER BY catalogoespecies_id', function(err, result) {
		if(err) {
			return console.error('error running query', err);
		}
		var ficha = {};
		async.eachSeries(result.rows, function(n,callback) {
			async.series({
				fillInitialData: function(callback) {
					var extractTaxonomy = n.taxoncompleto.split('>>');
					var species = '';
					var specificEpithet = '';
					if((typeof extractTaxonomy[1]) !== "undefined") {
						// Ficha posee taxonomia

						// Get species and specific epithet data
						if ((typeof extractTaxonomy[6]) !== "undefined") {
							if (/Especie/i.test(extractTaxonomy[6])) {
								species = extractTaxonomy[6].replace('Especie','').trim();
							} else {
								specificEpithet = extractTaxonomy[6].trim();
								species = ((typeof extractTaxonomy[7]) !== "undefined")?extractTaxonomy[7].trim():'';
							}
						}
						ficha = {
							catalogoEspeciesId: n.catalogoespecies_id,
							fechaActualizacion: n.fechaactualizacion,
							fechaElaboracion: n.fechaelaboracion,
							tituloMetadato: n.titulometadato,
							jerarquiaNombresComunes: n.jerarquianombrescomunes,
							active: n.active,
							licenciaInfo: n.licenciaInfo,
							taxonNombre: n.taxonnombre,
							taxonCompleto: n.taxoncompleto,
							taxonomia: {
								reino: extractTaxonomy[0].replace('Reino','').trim(),
								filo: extractTaxonomy[1].replace('Phylum','').replace('División','').trim(),
								clase: ((typeof extractTaxonomy[2]) !== "undefined")?extractTaxonomy[2].replace('Clase','').trim():'',
								orden: ((typeof extractTaxonomy[3]) !== "undefined")?extractTaxonomy[3].replace('Orden','').trim():'',
								familia: ((typeof extractTaxonomy[4]) !== "undefined")?extractTaxonomy[4].replace('Familia','').trim():'',
								genero: ((typeof extractTaxonomy[5]) !== "undefined")?extractTaxonomy[5].replace('Género','').trim():'',
								epitetoEspecifico: specificEpithet,
								especie: species
							},
							paginaweb: n.paginaweb,
							autor: ((typeof extractTaxonomy[8]) !== "undefined") ? extractTaxonomy[8].trim() : n.pcaat_ce_autor,
							verificacion: {
								email: n.email_verifica,
								emailResponsable: n.email_responsable_verifica,
								fecha: n.fecha_verifica,
								estadoId: n.verificado_estado_id,
								nombre: n.verificado_nombre,
								descripcion: n.verificado_descripcion,
								validoInd: n.verificado_valido_ind
							},
							"citacion": {
								citacionId: n.citacion_citacion_id,
								sistemaclasificacionInd: n.citacion_sistemaclasificacion_ind,
								fecha: n.citacion_fecha,
								documentoTitulo: n.citacion_documento_titulo,
								autor: n.citacion_autor,
								editor: n.citacion_editor,
								publicador: n.citacion_publicador,
								editorial: n.citacion_editorial,
								lugarPublicacion: n.citacion_lugar_publicacion,
								edicionVersion: n.citacion_edicion_version,
								volumen: n.citacion_volumen,
								serie: n.citacion_serie,
								numero: n.citacion_numero,
								paginas: n.citacion_paginas,
								hipervinculo: n.citacion_hipervinculo,
								fechaActualizacion: n.citacion_fecha_actualizacion,
								fechaConsulta: n.citacion_fecha_consulta,
								otros: n.citacion_otros,
								tipoId: n.citaciontipo_citaciontipo_id,
								tipoNombre: n.citaciontipo_citaciontipo_nombre,
								tipoSuperiorInd: n.citaciontipo_citacionsuperior_ind,
								tipoSerieSuperiorInd: n.citaciontipo_serie_o_citacionsuperior_ind
							},
							"contacto": {
								contactoId: n.contactos_contacto_id,
								direccion: n.contactos_direccion,
								telefono: n.contactos_telefono,
								acronimo: n.contactos_acronimo,
								persona: n.contactos_persona,
								fax: n.contactos_fax,
								correoElectronico: n.contactos_correo_electronico,
								organizacion: n.contactos_organizacion,
								cargo: n.contactos_cargo,
								instrucciones: n.contactos_instrucciones,
								horaInicial: n.contactos_hora_inicial,
								horaFinal: n.contactos_hora_final,
								idReferenteGeografico: n.referentegeografico_id_referente_geografico,
								poblacionDane: n.referentegeografico_poblacion_dane,
								intruccionesAcceso: n.referentegeografico_intruccionesacceso,
								localidadHistorica: n.referentegeografico_localidadhistorica,
								paisAbreviatura: n.pais_pais_abreviatura,
								paisNombre: n.pais_pais_nombre,
								subAbreviatura: n.subadministrativa_sub_abreviatura,
								subNombre: n.subadministrativa_sub_nombre,
								saDane: n.subadministrativa_sa_dane,
								tipoSubId: n.tiposub_tiposub_id,
								tipoSubNombre: n.tiposub_tiposub_nombre,
								ciudadMunicipioAbreviatura: n.ciudadmunicipio_ciudad_municipio_abreviatura,
								ciudadMunicipioNombre: n.ciudadmunicipio_ciudad_municipio_nombre,
								ciudadMunicipioDane: n.ciudadmunicipio_cm_dane
							}
						};
					}
					callback();
				},
				getCommonNamesData: function(callback) {
					client.query('SELECT \
						"public".catalogoespecies.catalogoespecies_id, \
						"public".pctesauros_ce.id_tesauros, \
						"public".pctesauros_ce.tesauronombre, \
						"public".pctesauros_ce.grupohumano, \
						"public".pctesauros_ce.idioma, \
						"public".pctesauros_ce.regionesgeograficas, \
						"public".pctesauros_ce.paginaweb, \
						"public".pctesauros_ce.tesaurocompleto \
						FROM \
						"public".catalogoespecies \
						INNER JOIN "public".pctesauros_ce ON "public".pctesauros_ce.catalogoespecies_id = "public".catalogoespecies.catalogoespecies_id \
						WHERE \
						"public".catalogoespecies.catalogoespecies_id = '+n.catalogoespecies_id, function(err, result) {
						if((typeof result !== 'undefined')) {
							if(result.rows.length > 0) {
								ficha['nombresComunes'] = [];
								ficha['listaNombresComunes'] = [];
								_.forEach(result.rows, function(n2,key2) {
									ficha.nombresComunes[key2] = {
										tesauroId: n2.id_tesauros,
										tesauroNombre: n2.tesauronombre,
										grupoHumano: n2.grupohumano,
										idioma: n2.idioma,
										regionesGeograficas: n2.regionesgeograficas,
										paginaWeb: n2.paginaweb,
										tesauroCompleto: n2.tesaurocompleto
									};
									ficha.listaNombresComunes.push(n2.tesauronombre);
								});
							}
						}
						callback();
					});
				},
				getDistribucionGeograficaDepartamentos: function(callback) {
					ficha['distribucionGeografica'] = {};
					client.query('SELECT \
						"public".pcdepartamentos_ce.sub_nombre \
						FROM \
						"public".catalogoespecies \
						INNER JOIN "public".pcdepartamentos_ce ON "public".pcdepartamentos_ce.catalogoespecies_id = "public".catalogoespecies.catalogoespecies_id \
						WHERE \
						"public".catalogoespecies.catalogoespecies_id = '+n.catalogoespecies_id, function(err, result) {
						if((typeof result !== 'undefined')) {
							if(result.rows.length > 0) {
								ficha['distribucionGeografica']['departamentos'] = [];
								_.forEach(result.rows, function(n2,key2) {
									ficha.distribucionGeografica.departamentos.push(n2.sub_nombre);
								});
							}
						}
						callback();
					});
				},
				getDistribucionGeograficaRegionesNaturales: function(callback) {
					if((typeof ficha['distribucionGeografica'] === 'undefined')) {
						ficha['distribucionGeografica'] = {};
					}
					client.query('SELECT \
						"public".pcregionnatural_ce.regionnatural \
						FROM \
						"public".catalogoespecies \
						INNER JOIN "public".pcregionnatural_ce ON "public".pcregionnatural_ce.catalogoespecies_id = "public".catalogoespecies.catalogoespecies_id \
						WHERE \
						"public".catalogoespecies.catalogoespecies_id = '+n.catalogoespecies_id, function(err, result) {
						if((typeof result !== 'undefined')) {
							if(result.rows.length > 0) {
								ficha['distribucionGeografica']['regionesNaturales'] = [];
								_.forEach(result.rows, function(n2,key2) {
									ficha.distribucionGeografica.regionesNaturales.push(n2.regionnatural);
								});
							}
						}
						callback();
					});
				},
				getDistribucionGeograficaCorporacionesAutonomasRegionales: function(callback) {
					if((typeof ficha['distribucionGeografica'] === 'undefined')) {
						ficha['distribucionGeografica'] = {};
					}
					client.query('SELECT \
						"public".pccorporaciones_ce.coorporaciones \
						FROM \
						"public".catalogoespecies \
						INNER JOIN "public".pccorporaciones_ce ON "public".pccorporaciones_ce.catalogoespecies_id = "public".catalogoespecies.catalogoespecies_id \
						WHERE \
						"public".catalogoespecies.catalogoespecies_id = '+n.catalogoespecies_id, function(err, result) {
						if((typeof result !== 'undefined')) {
							if(result.rows.length > 0) {
								ficha['distribucionGeografica']['corporacionesAutonomasRegionales'] = [];
								_.forEach(result.rows, function(n2,key2) {
									ficha.distribucionGeografica.corporacionesAutonomasRegionales.push(n2.coorporaciones);
								});
							}
						}
						callback();
					});
				},
				getDistribucionGeograficaOrganizaciones: function(callback) {
					if((typeof ficha['distribucionGeografica'] === 'undefined')) {
						ficha['distribucionGeografica'] = {};
					}
					client.query('SELECT \
						"public".pcorganizaciones_ce.organizaciones \
						FROM \
						"public".catalogoespecies \
						INNER JOIN "public".pcorganizaciones_ce ON "public".pcorganizaciones_ce.catalogoespecies_id = "public".catalogoespecies.catalogoespecies_id \
						WHERE \
						"public".catalogoespecies.catalogoespecies_id = '+n.catalogoespecies_id, function(err, result) {
						if((typeof result !== 'undefined')) {
							if(result.rows.length > 0) {
								ficha['distribucionGeografica']['organizaciones'] = [];
								_.forEach(result.rows, function(n2,key2) {
									ficha.distribucionGeografica.organizaciones.push(n2.organizaciones);
								});
							}
						}
						callback();
					});
				},
				getAtributos: function(callback) {
					client.query('SELECT \
						"public".atributovalor."id" AS "idFinalAtributo", \
						"public".atributovalor.valor AS "valorAtributo", \
						av_etiqueta."id" AS "idAtributo", \
						av_etiqueta.valor AS "nombreAtributo" \
						FROM \
						"public".catalogoespecies \
						INNER JOIN "public".ce_atributovalor ON "public".ce_atributovalor.catalogoespecies_id = "public".catalogoespecies.catalogoespecies_id \
						INNER JOIN "public".atributovalor ON "public".ce_atributovalor.valor = "public".atributovalor."id" \
						INNER JOIN "public".atributovalor AS av_etiqueta ON "public".ce_atributovalor.etiqueta = av_etiqueta."id" \
						WHERE \
						"public".catalogoespecies.catalogoespecies_id = '+n.catalogoespecies_id, function(err, result) {
						if((typeof result !== 'undefined')) {
							if(result.rows.length > 0) {
								// this registry has attributes
								ficha['atributos'] = {};
								_.forEach(result.rows, function(n2,key2) {
									if(n2.idAtributo === 3) {
										// Este id corresponde a estado de amenaza segun categoria UICN en Colombia
										if((typeof ficha.atributos.estadoDeAmenazaSegunCategoriaUICNColombia) === 'undefined') {
											ficha.atributos.estadoDeAmenazaSegunCategoriaUICNColombia = [];
										}
										ficha.atributos.estadoDeAmenazaSegunCategoriaUICNColombia.push(n2.valorAtributo);
									} else if (n2.idAtributo === 436) {
										// Este id corresponde a Créditos específicos}
										if((typeof ficha.atributos.creditosEspecificos) === 'undefined') {
											ficha.atributos.creditosEspecificos = [];
										}
										ficha.atributos.creditosEspecificos.push(n2.valorAtributo);
									} else if (n2.idAtributo === 8) {
										// Este id corresponde a distribucion geografica en Colombia
										if((typeof ficha.atributos.distribucionGeograficaEnColombia) === 'undefined') {
											ficha.atributos.distribucionGeograficaEnColombia = [];
										}
										ficha.atributos.distribucionGeograficaEnColombia.push(n2.valorAtributo);
									} else if (n2.idAtributo === 148) {
										// Este id corresponde a distribucion geografica en el mundo
										if((typeof ficha.atributos.distribucionGeograficaEnMundo) === 'undefined') {
											ficha.atributos.distribucionGeograficaEnMundo = [];
										}
										ficha.atributos.distribucionGeograficaEnMundo.push(n2.valorAtributo);
									} else if (n2.idAtributo === 26) {
										// Este id corresponde a comportamiento
										if((typeof ficha.atributos.comportamiento) === 'undefined') {
											ficha.atributos.comportamiento = [];
										}
										ficha.atributos.comportamiento.push(n2.valorAtributo);
									} else if (n2.idAtributo === 35) {
										// Este id corresponde a reproduccion
										if((typeof ficha.atributos.reproduccion) === 'undefined') {
											ficha.atributos.reproduccion = [];
										}
										ficha.atributos.reproduccion.push(n2.valorAtributo);
									} else if (n2.idAtributo === 31) {
										// Este id corresponde a habitat
										if((typeof ficha.atributos.habitat) === 'undefined') {
											ficha.atributos.habitat = [];
										}
										ficha.atributos.habitat.push(n2.valorAtributo);
									} else if (n2.idAtributo === 22) {
										// Este id corresponde a alimentacion
										if((typeof ficha.atributos.alimentacion) === 'undefined') {
											ficha.atributos.alimentacion = [];
										}
										ficha.atributos.alimentacion.push(n2.valorAtributo);
									} else if (n2.idAtributo === 18) {
										// Este id corresponde a Otros recursos en internet
										if((typeof ficha.atributos.otrosRecursosEnInternet) === 'undefined') {
											ficha.atributos.otrosRecursosEnInternet = [];
										}
										ficha.atributos.otrosRecursosEnInternet.push(n2.valorAtributo);
									} else if (n2.idAtributo === 1) {
										// Este id corresponde a Otros recursos en internet
										if((typeof ficha.atributos.distribucionAltitudinal) === 'undefined') {
											ficha.atributos.distribucionAltitudinal = [];
										}
										ficha.atributos.distribucionAltitudinal.push(n2.valorAtributo);
									} else if (n2.idAtributo === 6) {
										// Este id corresponde a factores de amenaza
										if((typeof ficha.atributos.factoresAmenaza) === 'undefined') {
											ficha.atributos.factoresAmenaza = [];
										}
										ficha.atributos.factoresAmenaza.push(n2.valorAtributo);
									} else if (n2.idAtributo === 3529) {
										// Este id corresponde a descripcion de la invasión
										if((typeof ficha.atributos.descripcionInvasion) === 'undefined') {
											ficha.atributos.descripcionInvasion = [];
										}
										ficha.atributos.descripcionInvasion.push(n2.valorAtributo);
									} else if (n2.idAtributo === 16) {
										// Este id corresponde a medidas de conservacion
										if((typeof ficha.atributos.medidasConservacion) === 'undefined') {
											ficha.atributos.medidasConservacion = [];
										}
										ficha.atributos.medidasConservacion.push(n2.valorAtributo);
									} else if (n2.idAtributo === 27) {
										// Este id corresponde a claves taxonomicas
										if((typeof ficha.atributos.clavesTaxonomicas) === 'undefined') {
											ficha.atributos.clavesTaxonomicas = [];
										}
										ficha.atributos.clavesTaxonomicas.push(n2.valorAtributo);
									} else if (n2.idAtributo === 39) {
										// Este id corresponde a Imagen
										if((typeof ficha.imagenes) === 'undefined') {
											ficha.imagenes = [];
										}
										ficha.imagenes.push({
											source: 'legacy',
											url: n2.valorAtributo
										});
									} else if (n2.idAtributo === 40) {
										// Este id corresponde a imagen
										if((typeof ficha.mapas) === 'undefined') {
											ficha.mapas = [];
										}
										ficha.mapas.push(n2.valorAtributo);
									} else if (n2.idAtributo === 42) {
										// Este id corresponde a sonido
										if((typeof ficha.sonidos) === 'undefined') {
											ficha.sonidos = [];
										}
										ficha.sonidos.push(n2.valorAtributo);
									} else if (n2.idAtributo === 28) {
										// Este id corresponde a Referencte bibliográfica
										if((typeof ficha.tempReferenciasBibliograficas) === 'undefined') {
											ficha.tempReferenciasBibliograficas = [];
										}
										ficha.tempReferenciasBibliograficas.push(n2.valorAtributo);
									} else if (n2.idAtributo === 19) {
										// Este id corresponde a autores
										if((typeof ficha.tempAutores) === 'undefined') {
											ficha.tempAutores = [];
										}
										ficha.tempAutores.push(n2.valorAtributo);
									} else if (n2.idAtributo === 24) {
										// Este id corresponde a colaboradores
										if((typeof ficha.tempColaboradores) === 'undefined') {
											ficha.tempColaboradores = [];
										}
										ficha.tempColaboradores.push(n2.valorAtributo);
									}
								});
							}
						}
						callback();
					});
				},
				getAtributosReferenciasBibliograficas: function(callback) {
					if((typeof ficha.tempReferenciasBibliograficas !== 'undefined')) {
						client.query('SELECT \
							"public".citacion.citacion_id, \
							"public".citacion.sistemaclasificacion_ind, \
							"public".citacion.autor, \
							"public".citacion.fecha, \
							"public".citacion.documento_titulo, \
							"public".citacion.editor, \
							"public".citacion.publicador, \
							"public".citacion.editorial, \
							"public".citacion.lugar_publicacion, \
							"public".citacion.edicion_version, \
							"public".citacion.volumen, \
							"public".citacion.serie, \
							"public".citacion.numero, \
							"public".citacion.paginas, \
							"public".citacion.hipervinculo, \
							"public".citacion.fecha_actualizacion, \
							"public".citacion.fecha_consulta, \
							"public".citacion.otros \
							FROM \
							"public".citacion \
							WHERE \
							"public".citacion.citacion_id IN ('+ficha.tempReferenciasBibliograficas+')', function(err, result) {
							if((typeof result !== 'undefined')) {
								if(result.rows.length > 0) {
									ficha.atributos.referenciasBibliograficas = [];
									_.forEach(result.rows, function(n2,key2) {
										ficha.atributos.referenciasBibliograficas.push({
											citacionId: n2.citacion_id,
											sistemaclasificacionInd: n2.sistemaclasificacion_ind,
											fecha: n2.fecha,
											documentoTitulo: n2.documento_titulo,
											autor: n2.autor,
											editor: n2.editor,
											publicador: n2.publicador,
											editorial: n2.editorial,
											lugarPublicacion: n2.lugar_publicacion,
											edicionVersion: n2.edicion_version,
											volumen: n2.volumen,
											serie: n2.serie,
											numero: n2.numero,
											paginas: n2.paginas,
											hipervinculo: n2.hipervinculo,
											fechaActualizacion: n2.fecha_actualizacion,
											fechaConsulta: n2.fecha_consulta,
											otros: n2.otros
										});
									});
								}
							}
							ficha.tempReferenciasBibliograficas = null;
							delete(ficha.tempReferenciasBibliograficas);
							callback();
						});
					} else {
						callback();
					}
				},
				getAtributosAutores: function(callback) {
					if((typeof ficha.tempAutores !== 'undefined')) {
						client.query('SELECT \
							"public".contactos.contacto_id, \
							"public".contactos.direccion, \
							"public".contactos.telefono, \
							"public".contactos.acronimo, \
							"public".contactos.persona, \
							"public".contactos.fax, \
							"public".contactos.correo_electronico, \
							"public".contactos.organizacion, \
							"public".contactos.cargo, \
							"public".contactos.instrucciones, \
							"public".contactos.hora_inicial, \
							"public".contactos.hora_final \
							FROM \
							"public".contactos \
							WHERE \
							"public".contactos.contacto_id IN ('+ficha.tempAutores+')', function(err, result) {
							if((typeof result !== 'undefined')) {
								if(result.rows.length > 0) {
									ficha.atributos.autores = [];
									_.forEach(result.rows, function(n2,key2) {
										ficha.atributos.autores.push({
											contactoId: n2.contacto_id,
											direccion: n2.direccion,
											telefono: n2.telefono,
											acronimo: n2.acronimo,
											persona: n2.persona,
											fax: n2.fax,
											correoElectronico: n2.correo_electronico,
											organizacion: n2.organizacion,
											cargo: n2.cargo,
											instrucciones: n2.instrucciones,
											horaInicial: n2.hora_inicial,
											horaFinal: n2.hora_final
										});
									});
								}
							}
							ficha.tempAutores = null;
							delete(ficha.tempAutores);
							callback();
						});
					} else {
						callback();
					}
				},
				getAtributosColaboradores: function(callback) {
					if((typeof ficha.tempColaboradores !== 'undefined')) {
						client.query('SELECT \
							"public".contactos.contacto_id, \
							"public".contactos.direccion, \
							"public".contactos.telefono, \
							"public".contactos.acronimo, \
							"public".contactos.persona, \
							"public".contactos.fax, \
							"public".contactos.correo_electronico, \
							"public".contactos.organizacion, \
							"public".contactos.cargo, \
							"public".contactos.instrucciones, \
							"public".contactos.hora_inicial, \
							"public".contactos.hora_final \
							FROM \
							"public".contactos \
							WHERE \
							"public".contactos.contacto_id IN ('+ficha.tempColaboradores+')', function(err, result) {
							if((typeof result !== 'undefined')) {
								if(result.rows.length > 0) {
									ficha.atributos.colaboradores = [];
									_.forEach(result.rows, function(n2,key2) {
										ficha.atributos.colaboradores.push({
											contactoId: n2.contacto_id,
											direccion: n2.direccion,
											telefono: n2.telefono,
											acronimo: n2.acronimo,
											persona: n2.persona,
											fax: n2.fax,
											correoElectronico: n2.correo_electronico,
											organizacion: n2.organizacion,
											cargo: n2.cargo,
											instrucciones: n2.instrucciones,
											horaInicial: n2.hora_inicial,
											horaFinal: n2.hora_final
										});
									});
								}
							}
							ficha.tempColaboradores = null;
							delete(ficha.tempColaboradores);
							callback();
						});
					} else {
						callback();
					}
				}
			}, function(err) {
				if(err) {
					console.log("Error saving data");
				} else {
					// Continue data processing
					console.log(ficha);
					callback();
				}
			})
			//console.log(row);
			//callback();
		}, function(err) {
			if(err) {
				console.log("Error saving data");
			} else {
				console.log("Catalog info saved successfully");
				client.end();
			}
		});
	});
});
