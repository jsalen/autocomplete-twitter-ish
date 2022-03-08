import { useRef, useState } from 'react'
import { useSearchBox } from 'react-instantsearch-hooks'
import getCaretCoordinates from 'textarea-caret'
import { Autocomplete } from './components/Autocomplete'
import { getActiveToken } from './utils/getActiveToken'

function App() {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [showAutoComplete, setShowAutoComplete] = useState(false)
  const { refine } = useSearchBox()
  const { top, height } = inputRef.current
    ? getCaretCoordinates(inputRef.current, inputRef.current.selectionEnd)
    : { top: 0, height: 0 }

  const handleInput = () => {
    const { value, selectionEnd = 0 } = inputRef.current!
    const { word } = getActiveToken(value, selectionEnd)
    const shouldOpenAutoComplete = /^@\w{1,15}$/.test(word)

    setShowAutoComplete(shouldOpenAutoComplete)
    showAutoComplete && refine(word.slice(1))
  }

  const handleSelection = (handle: string) => {
    const { value, selectionEnd = 0 } = inputRef.current!
    const { word, range } = getActiveToken(value, selectionEnd)
    const [index] = range
    const prefix = value.substring(0, index)
    const suffix = value.substring(index + word.length)
    const newValue = `${prefix}@${handle}${suffix} `

    inputRef.current!.value = newValue
    setShowAutoComplete(false)
    inputRef.current!.focus()
  }

  return (
    <main className="container">
      <section className="box">
        <div className="box-body">
          <aside className="box-avatar">
            <img
              src="https://pbs.twimg.com/profile_images/1463662468174159876/Sk_TBr4g_400x400.jpg"
              alt="salenjs"
            />
          </aside>

          <div className="box-compose">
            <form>
              <textarea
                placeholder="What's happening?"
                className="box-textbox"
                onKeyUp={handleInput}
                ref={inputRef}
              />
            </form>

            {showAutoComplete && (
              <Autocomplete
                handleSelection={handleSelection}
                top={`${top + height}px`}
              />
            )}
          </div>
        </div>

        <footer className="box-footer">
          <button type="submit" className="tweet-button">
            Tweet
          </button>
        </footer>
      </section>
    </main>
  )
}

export default App
