# Spotlight Backend API Documentation (v1)

RESTful API backend for Spotlight Elektrotechniek built using Node.js, Express, and Prisma ORM.

## Base URL
`http://localhost:5000/api/v1`

---

## Response Standard Format
All API endpoints share a unified response structure:

```json
{
  "status": 200,
  "data": {},
  "message": "Success message"
}