import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as bodymen } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Note, { schema } from './model'

const router = new Router()
const { title, body, tags, owner } = schema.tree

/**
 * @api {post} /notes Create note
 * @apiName CreateNote
 * @apiGroup Note
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title Note's title.
 * @apiParam body Note's body.
 * @apiParam tags Note's tags.
 * @apiParam owner Note's owner.
 * @apiSuccess {Object} note Note's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Note not found.
 * @apiError 401 admin access only.
 */
router.post(
  '/',
  token({ required: true }),
  bodymen({ title, body, tags, owner }),
  create
)

/**
 * @api {get} /notes Retrieve notes
 * @apiName RetrieveNotes
 * @apiGroup Note
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of notes.
 * @apiSuccess {Object[]} rows List of notes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/', token({ required: true }), query(), index)

/**
 * @api {get} /notes/:id Retrieve note
 * @apiName RetrieveNote
 * @apiGroup Note
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} note Note's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Note not found.
 * @apiError 401 admin access only.
 */
router.get('/:id', token({ required: true }), show)

/**
 * @api {put} /notes/:id Update note
 * @apiName UpdateNote
 * @apiGroup Note
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title Note's title.
 * @apiParam body Note's body.
 * @apiParam tags Note's tags.
 * @apiParam owner Note's owner.
 * @apiSuccess {Object} note Note's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Note not found.
 * @apiError 401 admin access only.
 */
router.put(
  '/:id',
  token({ required: true }),
  bodymen({ title, body, tags, owner }),
  update
)

/**
 * @api {delete} /notes/:id Delete note
 * @apiName DeleteNote
 * @apiGroup Note
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Note not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id', token({ required: true }), destroy)

export default router
