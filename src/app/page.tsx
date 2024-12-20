'use client'

import { Logo } from '@/components/logo'
import { ModalTransaction } from '@/components/modal-transaction'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { getValueFromBRL, getPrice } from '@/utils/currecy'

import Image from 'next/image'
import { useState } from 'react'

export interface Transaction {
  title: string
  price: string
  category: string
  date: string
  id: string
}

const storeKey = '@mensalize::transactions'

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    if (typeof window !== 'undefined') {
      const data = window?.localStorage?.getItem(storeKey)

      if (data) {
        return JSON.parse(data)
      }
    }

    return []
  })

  const handledTransactions = transactions.map((transaction) => {
    const value = getValueFromBRL(transaction.price)

    return {
      ...transaction,
      price: getPrice(value),
      price_yearly: getPrice(value * 12),
      date: new Date(`${transaction.date}T00:00`).toLocaleDateString('pt-BR'),
    }
  })

  function addTransaction(data: Transaction) {
    if (!data.title || !data.price || !data.category) {
      return
    }

    localStorage.setItem(storeKey, JSON.stringify([...transactions, data]))

    setTransactions([...transactions, data])
  }

  function deleteTransaction(id: string) {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id,
    )

    localStorage.setItem(storeKey, JSON.stringify(updatedTransactions))
    setTransactions(updatedTransactions)
  }

  const totalByMonth = transactions.reduce((acc, transaction) => {
    const value = getValueFromBRL(transaction.price)

    return acc + value
  }, 0)

  const totalYearly = totalByMonth * 12

  return (
    <main className="bg-gray-100 h-svh">
      <header className="bg-teal-700 h-[212px] text-red">
        <div className="container flex items-center justify-between mx-auto pt-8">
          <Logo />

          <AlertDialog>
            <AlertDialogTrigger className="shadow bg-emerald-600 text-white px-4 py-2 rounded font-semibold">
              <span>Nova mensalidade</span>
            </AlertDialogTrigger>
            <ModalTransaction onAdd={addTransaction} />
          </AlertDialog>
        </div>
      </header>
      <section className="flex container mx-auto gap-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden -mt-20 flex-1 px-12 py-6">
          <div className="text-blue-950 flex items-center justify-between">
            Mensal
            <Image src="/outcomes.svg" alt="Saída" width={40} height={40} />
          </div>
          <div className="mt-6 flex justify-between items-end">
            <div className="text-3xl text-blue-950">
              R${' '}
              <span className="font-semibold">
                {totalByMonth.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <span className="">/ao mês</span>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden -mt-20 flex-1 px-12 py-6">
          <div className="text-blue-950 flex items-center justify-between">
            Anual
            <Image src="/outcomes.svg" alt="Saída" width={40} height={40} />
          </div>
          <div className="mt-6 flex justify-between items-end">
            <div className="text-3xl text-blue-950">
              R${' '}
              <span className="font-semibold">
                {totalYearly.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <span className="">/ao ano</span>
          </div>
        </div>
      </section>
      <section className="container mx-auto mt-16">
        {handledTransactions.length > 0 && (
          <div className="grid grid-cols-[350px,1fr,1fr,1fr,1fr,1fr] px-8 gap-4 mx-auto">
            <span className="text-gray-500">Título</span>
            <span className="text-gray-500">Preço /mês</span>
            <span className="text-gray-500">Preço /ano</span>
            <span className="text-gray-500">Categoria</span>
            <span className="text-gray-500">Data pagamento</span>
            <span className="text-gray-500">Ações</span>
          </div>
        )}
        <div className="mt-5 space-y-2">
          {handledTransactions.map((transaction) => (
            <div
              className="bg-white rounded-md grid grid-cols-[350px,1fr,1fr,1fr,1fr,1fr] gap-4 mx-auto px-8 py-5 items-center"
              key={transaction.id}
            >
              <span>{transaction.title}</span>
              <span>{transaction.price}</span>
              <span>{transaction.price_yearly}</span>
              <span className="text-gray-400">{transaction.category}</span>
              <span className="text-gray-400">{transaction.date}</span>
              <span className="">
                <button
                  type="button"
                  className="underline cursor-pointer"
                  onClick={() => deleteTransaction(transaction.id)}
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
      </section>
    </main>
  )
}
