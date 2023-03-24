import { For } from 'solid-js'

import { Sidebar } from '../components/Sidebar'

export const Panel = () => {
  const tickets = []

  const statusClass = {
    OPENED: 'px-2 py-1 text-white rounded-full bg-blue-400',
    ARCHIVED: 'px-2 py-1 text-white rounded-full bg-orange-400',
    RESOLVED: 'px-2 py-1 text-white rounded-full bg-green-400',
    UNRESOLVED: 'px-2 py-1 text-white rounded-full bg-red-400',
  }

  const statusLabel = {
    OPENED: 'Aberto',
    ARCHIVED: 'Arquivado',
    RESOLVED: 'Resolvido',
    UNRESOLVED: 'Não resolvido',
  }

  function formatName(nameStr) {
    const name = nameStr.split(' ').join('+')
    return `https://ui-avatars.com/api/?rounded=true&background=FF922D&color=fff&name=${name}`
  }

  return (
    <div class="w-full h-screen w-full flex">
      <Sidebar />
      <main class="h-full w-full flex flex-col sm:flex-row overflow-auto">
        <section
          class="w-full sm:max-w-sm sm:h-full bg-gray-100 border-b sm:border-r border-zinc-300"
        >
          <div class="h-16 border-b border-zinc-300 flex items-center px-4">
            <h5 class="text-lg">Painel</h5>
          </div>
          <div class="p-4">
            <label
              for="search-tickets"
              class="w-full p-2 bg-white flex border border-gray-300 items-center"
            >
              <i
                class="mr-2 text-gray-400"
                data-feather="search"
                width="22"
                height="22"
              ></i>
              <input
                id="search-tickets"
                type="text"
                class="w-full outline-0"
                placeholder="Procurar tickets"
              />
            </label>
          </div>
          <div class="p-4">
            <ul class="ml-4 flex flex-col gap-3">
              <li class="font-medium cursor-pointer">Todos</li>
              <li class="text-zinc-600 cursor-pointer">Abertos</li>
              <li class="text-zinc-600 cursor-pointer">Resolvidos</li>
              <li class="text-zinc-600 cursor-pointer">Não resolvidos</li>
              <li class="text-zinc-600 cursor-pointer">Arquivados</li>
            </ul>
          </div>
        </section>
        <section class="flex-1 overflow-auto">
          <div class="h-16 border-b border-zinc-300 flex items-center px-4">
            <h5 class="text-lg">Todos os tickets</h5>
          </div>
          <div class="overflow-auto">
            <div class="min-w-[1024px] w-full">
              <table class="border-collapse table-auto w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-300">
                    <th class="pl-4 text-left">
                      <input type="checkbox" class="w-4 h-4" />
                    </th>
                    <th class="p-4 text-left font-medium">Quem reportou</th>
                    <th class="p-4 text-left font-medium">Assunto</th>
                    <th class="p-4 text-left font-medium">Responsável</th>
                    <th class="p-4 text-left font-medium">Status</th>
                    <th class="p-4 text-left font-medium">
                      Última atualização
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <For each={tickets} fallback={(
                    <tr>
                      <td
                        colspan="6"
                        class="text-center pt-8 pb-4 text-zinc-400 font-bold"
                      >
                        Nenhum ticket disponível
                      </td>
                    </tr>
                  )}>
                    {(ticket) => (
                      <tr class="odd:bg-gray-100 hover:bg-gray-200">
                        <td class="pl-4">
                          <input
                            id={ticket.id}
                            type="checkbox"
                            class="w-4 h-4"
                          />
                        </td>
                        <td class="p-4">
                          <div class="flex items-center">
                            <img
                              src={formatName(ticket.reporter.name)}
                              alt={`${ticket.reporter.name} image`}
                              width="36"
                              height="36"
                              class="mr-3"
                            />
                            <div class="flex flex-col">
                              <p class="">{ticket.reporter.name}</p>
                              <span class="text-zinc-400 text-sm">{ticket.reporter.email}</span>
                            </div>
                          </div>
                        </td>
                        <td class="p-4">{ticket.subject}</td>
                        <td class="p-4">{ticket.responsable.name}</td>
                        <td class="p-4">
                          <span class={statusClass[ticket.status]}>{statusLabel[ticket.status]}</span>
                        </td>
                        <td class="p-4">
                          {new Date(ticket?.updatedAt || ticket.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    )}
                  </For>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
