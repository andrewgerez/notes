import NewNoteCard from "./components/new-note-card";
import NoteCard from "./components/note-card";

const note = {
  date: new Date(),
  content: ":p"
}

export function App() {
  return (
    <div className="mx-auto my-12 max-w-6xl space-y-6">
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard />
        <NoteCard note={note} />
      </div>
    </div>
  )
}
