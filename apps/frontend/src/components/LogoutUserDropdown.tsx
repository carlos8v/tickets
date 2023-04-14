type Props = {
  options: {
    key: string,
    text: string
    onClick: () => void
  }[]
}

export const LogoutUserDropdown = (props: Props) => {
  return (
    <div className="absolute bottom-0 right-0 translate-x-[calc(100%+1rem)] z-10 ml-4 w-44">
      <div className="relative bg-white border border-gray-300 rounded">
        <div className="z-10 absolute inline-block left-0 bottom-0 -translate-y-[calc(20px+0.25rem)] -translate-x-[calc(50%+1px)] p-1 bg-white border-b border-l border-gray-300 rotate-45"></div>
        <div className="z-20 relative">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {props.options.map(({ key, text, onClick = () => {} }) => (
              <li key={key}>
                <button
                  className="text-left text-black text-base font-light w-full px-4 py-2 hover:bg-gray-100"
                  onClick={() => onClick()}
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
