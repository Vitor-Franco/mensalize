import type { Transaction } from '@/app/page'
import { getValueFromBRL, getPrice } from '@/utils/currecy'
import React from 'react'

interface TableTransactionProps {
  transactions: Transaction[]
  onDelete: (id: string) => void
}

function TableTransactions({
  transactions,
  onDelete,
}: Readonly<TableTransactionProps>) {
  const handledTransactions = transactions.map((transaction) => {
    const value = getValueFromBRL(transaction.price)

    return {
      ...transaction,
      price: getPrice(value),
      price_yearly: getPrice(value * 12),
      date: new Date(`${transaction.date}T00:00`).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
      }),
    }
  })

  return (
    <>
      {handledTransactions.length > 0 && (
        <div className="grid grid-cols-[150px,150px,150px,150px,150px,150px] lg:grid-cols-[350px,1fr,1fr,1fr,1fr,1fr] px-8 gap-4 mx-auto">
          <span className="text-gray-500">Título</span>
          <span className="text-gray-500">Preço /mês</span>
          <span className="text-gray-500">Preço /ano</span>
          <span className="text-gray-500">Categoria</span>
          <span className="text-gray-500">Data da cobrança</span>
          <span className="text-gray-500">Ações</span>
        </div>
      )}
      <div className="mt-5 space-y-2">
        {handledTransactions.map((transaction) => (
          <div
            className="bg-white hover:bg-gray-50 rounded-md grid grid-cols-[150px,150px,150px,150px,150px,150px]  lg:grid-cols-[350px,1fr,1fr,1fr,1fr,1fr] gap-4 mx-auto px-8 py-5 items-center"
            key={transaction.id}
          >
            <span className="text-ellipsis line-clamp-1">
              {transaction.title}
            </span>
            <span>{transaction.price}</span>
            <span>{transaction.price_yearly}</span>
            <span className="text-gray-400">{transaction.category}</span>
            <span className="text-gray-400">{transaction.date}</span>
            <span className="">
              <button
                type="button"
                className="underline cursor-pointer"
                onClick={() => {
                  if (
                    window === undefined ||
                    window.confirm(
                      'Tem certeza que deseja deletar uma transação?',
                    )
                  ) {
                    onDelete(transaction.id)
                  }
                }}
              >
                Excluir
              </button>
            </span>
          </div>
        ))}

        {handledTransactions.length === 0 && (
          <div className="text-center mt-8 text-gray-500">
            <span>Nenhuma transação cadastrada</span>
          </div>
        )}
      </div>
    </>
  )
}

export { TableTransactions }
