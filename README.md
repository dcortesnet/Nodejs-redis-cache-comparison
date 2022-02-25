# Nodejs Redis cache comparison &middot; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

Comparación de tiempos y respuestas utilizando redis con nodejs

## Acerca de redis

https://redis.io/

## Instalación

ejecutar comando

```
npm install
```

## Levantar proyecto

```
$ docker run --name rdb -p 6379:6379 redis
$ npm run dev
```

## Tabla comparativa resultados

* API utilizadada SpaceX: ```https://api.spacexdata.com/v3/rockets```
* URL Solicitudes con redis ```http://localhost:3000/with-redis-rockets```
* URL Solicitudes sin redis ```http://localhost:3000/without-redis-rockets```

NOTA: Por cada endpoint se realizarón X peticiones (50 en este ejemplo ), estas fueron promediadas dando los siguientes resultados.

| Con redis promedio | Sin redis promedio |
| -- | --  |
| 2.377 ms | 443.609 ms

|Resultado aprox |
| -- |
+180 veces más rápido

## Equipo

Desarrollado por Diego Cortés

* dcortes.net@gmail.com