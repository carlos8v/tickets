import { Search } from 'react-feather'
import { Sidebar } from '../components/Sidebar'

export const Panel = () => {
  const tickets = [] as any[]

  const statusClass = {
    OPENED: 'px-2 py-1 text-white rounded-full bg-blue-400',
    ARCHIVED: 'px-2 py-1 text-white rounded-full bg-orange-400',
    RESOLVED: 'px-2 py-1 text-white rounded-full bg-green-400',
    UNRESOLVED: 'px-2 py-1 text-white rounded-full bg-red-400',
  } as Record<string, string>

  const statusLabel = {
    OPENED: 'Aberto',
    ARCHIVED: 'Arquivado',
    RESOLVED: 'Resolvido',
    UNRESOLVED: 'Não resolvido',
  } as Record<string, string>

  function formatName(nameStr: string) {
    const name = nameStr.split(' ').join('+')
    return `https://ui-avatars.com/api/?rounded=true&background=FF922D&color=fff&name=${name}`
  }

  return (
    <div className="w-full h-screen w-full flex">
      <Sidebar />
      <main className="h-full w-full flex flex-col sm:flex-row overflow-auto">
        <section className="w-full sm:max-w-sm sm:h-full bg-gray-100 border-b sm:border-r border-zinc-300">
          <div className="h-16 border-b border-zinc-300 flex items-center px-4">
            <h5 className="text-lg">Painel</h5>
          </div>
          <div className="p-4">
            <label
              htmlFor="search-tickets"
              className="w-full p-2 bg-white flex border border-gray-300 items-center"
            >
              <Search
                className="mr-2 text-gray-400"
                width={22}
                height={22}
              />
              <input
                id="search-tickets"
                type="text"
                className="w-full outline-0"
                placeholder="Procurar tickets"
              />
            </label>
          </div>
          <div className="p-4">
            <ul className="ml-4 flex flex-col gap-3">
              <li className="font-medium cursor-pointer">Todos</li>
              <li className="text-zinc-600 cursor-pointer">Abertos</li>
              <li className="text-zinc-600 cursor-pointer">Resolvidos</li>
              <li className="text-zinc-600 cursor-pointer">Não resolvidos</li>
              <li className="text-zinc-600 cursor-pointer">Arquivados</li>
            </ul>
          </div>
        </section>
        <section className="flex-1 overflow-auto">
          <div className="h-16 border-b border-zinc-300 flex items-center px-4">
            <h5 className="text-lg">Todos os tickets</h5>
          </div>
          <div className="overflow-auto">
            <div className="min-w-[1024px] w-full">
              <table className="border-collapse table-auto w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="pl-4 text-left">
                      <input type="checkbox" className="w-4 h-4" />
                    </th>
                    <th className="p-4 text-left font-medium">Quem reportou</th>
                    <th className="p-4 text-left font-medium">Assunto</th>
                    <th className="p-4 text-left font-medium">Responsável</th>
                    <th className="p-4 text-left font-medium">Status</th>
                    <th className="p-4 text-left font-medium">
                      Última atualização
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!tickets?.length ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center pt-8 pb-4 text-zinc-400 font-bold"
                      >
                        Nenhum ticket disponível
                      </td>
                    </tr>
                  ) : null}
                  {tickets.map((ticket) => (
                    <tr className="odd:bg-gray-100 hover:bg-gray-200">
                      <td className="pl-4">
                        <input
                          id={ticket.id}
                          type="checkbox"
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <img
                            src={formatName(ticket.reporter.name)}
                            alt={`${ticket.reporter.name} image`}
                            width="36"
                            height="36"
                            className="mr-3"
                          />
                          <div className="flex flex-col">
                            <p className="">{ticket.reporter.name}</p>
                            <span className="text-zinc-400 text-sm">
                              {ticket.reporter.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{ticket.subject}</td>
                      <td className="p-4">{ticket.responsable.name}</td>
                      <td className="p-4">
                        <span className={statusClass[ticket.status]}>
                          {statusLabel[ticket.status]}
                        </span>
                      </td>
                      <td className="p-4">
                        {new Date(
                          ticket?.updatedAt || ticket.createdAt
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
