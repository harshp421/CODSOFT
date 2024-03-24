import React from 'react'

const Aboutus = () => {
  return (
    <section className="pt-10 overflow-hidden  md:pt-0 sm:pt-16 2xl:pt-16">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 md:grid-cols-2">

            <div>
                <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">Hey 👋 I am
                    <br className="block sm:hidden" />Harsh Parmar
                </h2>
                <p className="max-w-lg mt-3 text-lg leading-relaxedmd:mt-8">
                Hello Folks!, Talking about me, i have good skills in some core programming languages such as core JAVA, C, quary language such as SQL, MongoDB, and Web Languages such as HTML, JAVASCRIPT, REACT.JS, EXPRESS.JS, NODE.JS, TYPESCRIPT, web styling language such as CSS, TAILWIND CSS, BOOTSTRAP, ANT DESIGN, MATERIAL-UI ,SHAD-CN. Trying to gather and digest more and more knowledge about web development. 
Open to do any collaboration and educational project on web development.
                </p>

                <p className="mt-4 text-xlmd:mt-8">
                    <span className="relative inline-block">
                        <span className="absolute inline-block w-full bottom-0.5 h-2 "></span>
                    <span className="relative"> Have a question? </span>
                    </span>
                    <br className="block sm:hidden" />Ask me on <a href="#" title=""
                        className="transition-all duration-200 text-sky-500 hover:text-sky-600 hover:underline">Twitter</a>
                </p>
            </div>

            <div className="relative">
                <img className="absolute inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/blob-shape.svg" alt="" />

                <img className="relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110" src="https://harsh-portfolio-react.netlify.app/static/media/profile1-min.cc08df224a1b762a099c.png" alt="" />
            </div>

        </div>
    </div>
</section>
  )
}

export default Aboutus