import Navbar from '@/components/shared/Navbar'


const HomeLayout = ({children}:any) => {
  return (
    <div>
         <Navbar/>
        {children}
    </div>
  )
}

export default HomeLayout