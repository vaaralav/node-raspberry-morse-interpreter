# Morse Server HTTP API

## `GET /`
Where the UI is served

## `POST /api/morse`

Blink a morse code.

Key | Value
--- | -----
`text` | `string` Text to be transformed into morse code.


```HTTP
POST /api/morse HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
	"text": "SMS"
}
```

```HTTP
HTTP/1.1 201
Content-Type: application/json; charset=utf-8

{
  "id": 1,
  "text": "SMS",
  "morse": "... -- ..."
}
```

## `GET /api/morse`

Get all existing morse entities.

```HTTP
GET /api/morse HTTP/1.1
Host: localhost:8080
Content-Type: application/json
```

```HTTP
HTTP/1.1 200
Content-Type: application/json; charset=utf-8

[
	{
	  "id": 1,
	  "text": "SMS",
	  "morse": "... -- ..."
	}
]
```

## `GET /api/morse/:id`
Get a single morse entity by `id`.

## `DELETE /api/morse/:id`
Deletes a single morse entity by `id`.
