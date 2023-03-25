import { Tag, Users, Settings } from 'react-feather'

export const Sidebar = () => {
  return (
    <aside className="h-full sticky hidden sm:block bg-zinc-900 text-sm font-thin text-center text-zinc-400 select-none">
      <div className="flex-1 h-full flex flex-col justify-between">
        <div className="w-16 flex-1 flex flex-col items-center">
          <div className="block w-full h-16"></div>
          <div className="w-full py-3 flex flex-col items-center cursor-pointer transition group hover:bg-zinc-800">
            <Tag width={22} height={22} />
            <span>Painel</span>
          </div>
          <div className="w-full py-3 flex flex-col items-center cursor-pointer transition group hover:bg-zinc-800">
            <Users width={22} height={22} />
            <span>Usuários</span>
          </div>
        </div>
        <div className="w-16 flex flex-col justify-end items-center">
          <div className="w-full py-3 flex flex-col items-center cursor-pointer transition group hover:bg-zinc-800">
            <Settings width={22} height={22} />
            <span>Ajustes</span>
          </div>
          <div className="w-full py-3 flex flex-col items-center text-center mb-4">
            <img
              src="https://ui-avatars.com/api/background=475F9C&color=fff&rounded=true&format=svg&name=BG&size=36"
              width="36"
              height="36"
              alt="User profile"
            />
          </div>
        </div>
      </div>
    </aside>
  )
}
