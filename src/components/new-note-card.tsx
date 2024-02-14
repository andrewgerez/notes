import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from 'sonner'

interface INewNoteCard {
  onNoteCreated: (content: string) => void;
}

const NewNoteCard = ({ onNoteCreated }: INewNoteCard) => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [content, setContent] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  const handleOpenModal = () => {
    setShouldShowOnboarding(true)
  }

  const handleStartEditor = () => {
    setShouldShowOnboarding(false)
  }

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)

    if (e.target.value === "") {
      setShouldShowOnboarding(true)
    }
  }

  const handleSaveNote = (e: FormEvent) => {
    e.preventDefault()

    if (content === '') return

    onNoteCreated(content)
    setContent('')
    setShouldShowOnboarding(true)

    toast.success('Nota criada com sucesso!')
  }

  const handleStartRecording = () => {
    setIsRecording(true)
  }

  const handleStopRecording = () => {
    setIsRecording(false)
  }

  return (
    <Dialog.Root onOpenChange={handleOpenModal}>
      <Dialog.Trigger className="flex flex-col rounded-md bg-slate-700 p-5 gap-3 text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>

        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida em texto automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed flex flex-col overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md outline-none">
          <Dialog.Close className="absolute top-0 right-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>
          <form className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
              </span>

              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece <button type="button" className="font-medium text-lime-400 hover:underline" onClick={handleStartRecording}>gravando uma nota</button> em áudio ou se preferir <button type="button" className="font-medium text-lime-400 hover:underline" onClick={handleStartEditor}>utilize apenas texto</button>.
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                  onChange={handleContentChange}
                  value={content}
                />
              )}
            </div>

            {isRecording ? (
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-100"
                onClick={handleStopRecording}
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                Gravando! (clique para interromper)
              </button>
            ) : (
              <button
                type="button"
                className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
                onClick={handleSaveNote}
              >
                Salvar nota
              </button>
            )}

          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default NewNoteCard;
