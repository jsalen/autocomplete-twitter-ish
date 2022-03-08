import { useHits } from 'react-instantsearch-hooks'

interface Props {
  handleSelection: (value: string) => void
  top: string
}

export function Autocomplete({ handleSelection, top }: Props) {
  const { hits } = useHits()

  return (
    <div className="autocomplete-panel" style={{ top }}>
      {hits.length > 0 && (
        <ul className="autocomplete-items">
          {hits.map((hit: any) => (
            <li key={hit.handle}>
              <button
                className="autocomplete-item"
                onClick={() => handleSelection(hit.handle)}
              >
                <AutocompleteHit hit={hit} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function AutocompleteHit({ hit }: any) {
  return (
    <div className="account-body">
      <div className="account-avatar">
        <img src={hit.image} alt={hit.handle} />
      </div>

      <div>
        <div className="account-name">{hit.name}</div>

        <div className="account-handle">@{hit.handle}</div>
      </div>
    </div>
  )
}
