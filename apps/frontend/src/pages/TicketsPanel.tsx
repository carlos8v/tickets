import { useState, useEffect } from 'react'
import { Search } from 'react-feather'

import type { TicketModel, TicketStatus } from '@domain/ticket'

import { Sidebar } from '../components/Sidebar'
import { trpc } from '../services/trpc'

import { statusClass, statusLabel, getUserImage } from '../utils'

export const TicketsPanel = () => {
  const [status, setStatus] = useState<TicketStatus | 'ALL'>('ALL')
  const [name, setName] = useState('')

  const [tickets, setTickets] = useState<TicketModel[]>([])

  useEffect(() => {
    trpc.findAllTickets.query({ status, name }).then((res) => setTickets(res))
  }, [status, name])

  return (
    <div className="w-full h-screen w-full flex">
      <Sidebar />
      <main className="h-full w-full flex flex-col sm:flex-row overflow-auto">
        <section className="w-full sm:max-w-[16rem] sm:h-full bg-gray-100 border-b sm:border-r border-zinc-300">
          <div className="h-16 border-b border-zinc-300 flex items-center px-4">
            <h5 className="text-lg">Painel</h5>
          </div>
          <div className="p-4">
            <label
              htmlFor="search-tickets"
              className="w-full p-2 bg-white flex border border-gray-300 items-center"
            >
              <Search className="mr-2 text-gray-400" width={22} height={22} />
              <input
                id="search-tickets"
                type="text"
                className="w-full outline-0"
                placeholder="Procurar tickets"
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </label>
          </div>
          <div className="p-4">
            <ul className="ml-4 flex flex-col gap-3">
              <li className={`${status === 'ALL' ? 'font-medium' : 'text-zinc-600'} cursor-pointer`}>
                <button onClick={() => setStatus('ALL')}>Todos</button>
              </li>
              <li className={`${status === 'OPENED' ? 'font-medium' : 'text-zinc-600'} cursor-pointer`}>
                <button onClick={() => setStatus('OPENED')}>Abertos</button>
              </li>
              <li className={`${status === 'RESOLVED' ? 'font-medium' : 'text-zinc-600'} cursor-pointer`}>
                <button onClick={() => setStatus('RESOLVED')}>
                  Resolvidos
                </button>
              </li>
              <li className={`${status === 'UNRESOLVED' ? 'font-medium' : 'text-zinc-600'} cursor-pointer`}>
                <button onClick={() => setStatus('UNRESOLVED')}>
                  Não resolvidos
                </button>
              </li>
              <li className={`${status === 'ARCHIVED' ? 'font-medium' : 'text-zinc-600'} cursor-pointer`}>
                <button onClick={() => setStatus('ARCHIVED')}>
                  Arquivados
                </button>
              </li>
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
                    <tr
                      className="odd:bg-gray-100 hover:bg-gray-200"
                      key={ticket.id}
                    >
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
                            src={getUserImage(ticket.reportedBy.name)}
                            alt={`${ticket.reportedBy.name} image`}
                            width="36"
                            height="36"
                            className="mr-3"
                          />
                          <div className="flex flex-col">
                            <p className="">{ticket.reportedBy.email}</p>
                            <span className="text-zinc-400 text-sm">
                              {ticket.reportedBy.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{ticket.subject}</td>
                      <td className="p-4">
                        {ticket.responsable?.name || 'Não atribuido'}
                      </td>
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
