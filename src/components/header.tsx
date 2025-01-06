import type { Transaction } from '@/app/page'
import { Logo } from '@/components/logo'
import { ModalTransaction } from '@/components/modal-transaction'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'

import React from 'react'

interface HeaderProps {
  onAddTransaction: (payload: Transaction) => void
}

function Header({ onAddTransaction }: Readonly<HeaderProps>) {
  return (
    <header className="bg-teal-700 lg:h-[212px] text-red">
      <div className="container flex items-center justify-between px-2 py-8 mx-auto lg:pb-0 lg:pt-8">
        <Logo />

        <AlertDialog>
          <AlertDialogTrigger className="px-4 py-2 font-semibold text-white rounded shadow bg-emerald-600">
            <span>Nova mensalidade</span>
          </AlertDialogTrigger>
          <ModalTransaction onAdd={onAddTransaction} />
        </AlertDialog>
      </div>
    </header>
  )
}

export { Header }
