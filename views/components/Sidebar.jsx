export const Sidebar = () => {
  return (
    <aside class="h-full sticky hidden sm:block bg-zinc-900 text-sm font-thin text-center text-zinc-400 select-none">
      <div class="flex-1 h-full flex flex-col justify-between">
        <div class="w-16 flex-1 flex flex-col items-center">
          <div class="block w-full h-16"></div>
          <div class="w-full py-3 flex flex-col items-center cursor-pointer transition group hover:bg-zinc-800">
            <i data-feather="tag" width="22" height="22"></i>
            <span>Painel</span>
          </div>
          <div class="w-full py-3 flex flex-col items-center cursor-pointer transition group hover:bg-zinc-800">
            <i data-feather="users" width="22" height="22"></i>
            <span>Usuários</span>
          </div>
        </div>
        <div class="w-16 flex flex-col justify-end items-center">
          <div class="w-full py-3 flex flex-col items-center cursor-pointer transition group hover:bg-zinc-800">
            <i data-feather="settings" width="22" height="22"></i>
            <span>Ajustes</span>
          </div>
          <div class="w-full py-3 flex flex-col items-center text-center mb-4">
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
