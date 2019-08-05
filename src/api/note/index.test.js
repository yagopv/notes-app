import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Note } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, note

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  note = await Note.create({})
})

test('POST /notes 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, title: 'test', body: 'test', tags: 'test', owner: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.body).toEqual('test')
  expect(body.tags).toEqual('test')
  expect(body.owner).toEqual('test')
})

test('POST /notes 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /notes 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /notes 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /notes 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /notes 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /notes/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${note.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(note.id)
})

test('GET /notes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${note.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /notes/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${note.id}`)
  expect(status).toBe(401)
})

test('GET /notes/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /notes/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${note.id}`)
    .send({ access_token: adminSession, title: 'test', body: 'test', tags: 'test', owner: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(note.id)
  expect(body.title).toEqual('test')
  expect(body.body).toEqual('test')
  expect(body.tags).toEqual('test')
  expect(body.owner).toEqual('test')
})

test('PUT /notes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${note.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /notes/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${note.id}`)
  expect(status).toBe(401)
})

test('PUT /notes/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, title: 'test', body: 'test', tags: 'test', owner: 'test' })
  expect(status).toBe(404)
})

test('DELETE /notes/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${note.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /notes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${note.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /notes/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${note.id}`)
  expect(status).toBe(401)
})

test('DELETE /notes/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
