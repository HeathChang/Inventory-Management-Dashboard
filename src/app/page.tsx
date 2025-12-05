import { redirect } from 'next/navigation'

export default async function Home() {
    redirect('/donator/mypage/inventory-manage')
}

