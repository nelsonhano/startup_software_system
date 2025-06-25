import { auth } from '@/auth'
import StartUpForm from '@/components/StartUpForm'
import { redirect } from 'next/navigation'

export default async function page() {
  const session = await auth();
  if (!session) redirect("/");
  
  return (
    <>
      <section className="w-full bg-pink-700 pattern flex justify-center items-center flex-col py-10 px-6 overflow-hidden min-h-[230px]">
        <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">
          submit your start up
        </h1>
      </section>
      <StartUpForm />
    </>
  )
}
