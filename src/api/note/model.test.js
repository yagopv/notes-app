import { Note } from '.'

let note

beforeEach(async () => {
  note = await Note.create({
    title: 'test',
    content: 'test',
    tags: 'test',
    owner: 'test'
  })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = note.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(note.id)
    expect(view.title).toBe(note.title)
    expect(view.content).toBe(note.content)
    expect(view.tags).toBe(note.tags)
    expect(view.owner).toBe(note.owner)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = note.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(note.id)
    expect(view.title).toBe(note.title)
    expect(view.content).toBe(note.content)
    expect(view.tags).toBe(note.tags)
    expect(view.owner).toBe(note.owner)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
