'use client'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { TableTransactions } from '@/components/table-transactions'
import { getValueFromBRL } from '@/utils/currecy'

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

  const totalMonthly = transactions.reduce((acc, transaction) => {
    const value = getValueFromBRL(transaction.price)

    return acc + value
  }, 0)

  const totalYearly = totalMonthly * 12

  return (
    <main className="flex flex-col bg-gray-100 min-h-svh">
      <Header onAddTransaction={addTransaction} />
      <section className="container flex flex-col gap-4 px-2 mx-auto mt-4 lg:flex-row lg:mt-0 lg:gap-8">
        <div className="flex-1 px-12 py-6 overflow-hidden bg-white rounded-lg shadow-md hover:bg-gray-50 lg:-mt-20">
          <div className="flex items-center justify-between text-blue-950">
            Mensal
            <Image src="/outcomes.svg" alt="Saída" width={40} height={40} />
          </div>
          <div className="flex items-end justify-between mt-6">
            <div className="text-3xl text-blue-950">
              R${' '}
              <span className="font-semibold">
                {totalMonthly.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <span className="">/ao mês</span>
          </div>
        </div>
        <div className="flex-1 px-12 py-6 overflow-hidden bg-white rounded-lg shadow-md hover:bg-gray-50 lg:-mt-20">
          <div className="flex items-center justify-between text-blue-950">
            Anual
            <Image src="/outcomes.svg" alt="Saída" width={40} height={40} />
          </div>
          <div className="flex items-end justify-between mt-6">
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
      <section className="container px-2 mx-auto mt-16 mb-8 overflow-x-auto">
        <TableTransactions
          transactions={transactions}
          onDelete={(id) => deleteTransaction(id)}
        />
      </section>

      <Footer />
    </main>
  )
}
