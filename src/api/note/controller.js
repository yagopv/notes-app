import { success, notFound } from '../../services/response/'
import { Note } from '.'

export const create = ({ bodymen: { body }, user }, res, next) => {
  const note = { ...body, owner: user.id }

  return Note.create(note)
    .then(note => note.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const index = (
  { querymen: { query, select, cursor }, user },
  res,
  next
) => {
  const noteQuery = { ...query, owner: user.id }

  return Note.count(noteQuery)
    .then(count =>
      Note.find(noteQuery, select, cursor)
        .populate('owner', 'name picture email')
        .then(notes => ({
          count,
          rows: notes.map(note => note.view())
        }))
    )
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  Note.findById(params.id)
    .then(notFound(res))
    .then(note => (note ? note.view() : null))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Note.findById(params.id)
    .then(notFound(res))
    .then(note => (note ? Object.assign(note, body).save() : null))
    .then(note => (note ? note.view(true) : null))
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Note.findById(params.id)
    .then(notFound(res))
    .then(note => (note ? note.remove() : null))
    .then(success(res, 204))
    .catch(next)
