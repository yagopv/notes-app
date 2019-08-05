import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Notes, { schema } from './model'

const router = new Router()
const { title, body } = schema.tree

/**
 * @api {post} /notes Create notes
 * @apiName CreateNotes
 * @apiGroup Notes
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title Notes's title.
 * @apiParam body Notes's body.
 * @apiSuccess {Object} notes Notes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Notes not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ title, body }),
  create)

/**
 * @api {get} /notes Retrieve notes
 * @apiName RetrieveNotes
 * @apiGroup Notes
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of notes.
 * @apiSuccess {Object[]} rows List of notes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /notes/:id Retrieve notes
 * @apiName RetrieveNotes
 * @apiGroup Notes
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} notes Notes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Notes not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /notes/:id Update notes
 * @apiName UpdateNotes
 * @apiGroup Notes
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title Notes's title.
 * @apiParam body Notes's body.
 * @apiSuccess {Object} notes Notes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Notes not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ title, body }),
  update)

/**
 * @api {delete} /notes/:id Delete notes
 * @apiName DeleteNotes
 * @apiGroup Notes
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Notes not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
