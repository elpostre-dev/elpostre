import NavBar from "./components/Navbar";
import bgImage from "../public/home.jpg";


export default function Home() {

  return (
    <main className="flex min-h-screen flex-col">

      {/* NAVBAR */}
      <NavBar />

      {/* FOTO background y TEXTO */}
      <section
        className="bg-center bg-no-repeat bg-blend-multiply bg-cover"
        style={{
          backgroundImage: `url(${bgImage.src})`,
          // backgroundColor: "rgba(12, 64, 104, 0.8)",
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          // backgroundAttachment: "fixed",
          // opacity: "0.5",
          height: "85vh",
        }}
      >
        {/* <div className="px-4 mx-auto max-w-screen-xl text-center flex flex-col items-center justify-center h-full">
          <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
            Expertos en soluciones legales e inmobiliarias
          </h1>
          <p className="text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Nos diferenciamos en estrategias y soluciones de diagnóstico inmobiliario para ayudar a los clientes en situaciones personales y problemáticas de negocio.
          </p>
        </div> */}
      </section>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">

          <h2 className="text-2xl font-bold tracking-tight text-mainRojo-100">
            Conoce nuestros bestsellers
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

            {/* Producto #1 */}
            <div className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img src="/Brownies/BROWNIES_GLASS.jpg" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-md text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      Brownie Glass
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Brownies</p>
                </div>
                <p className="text-md font-medium text-gray-900">$500</p>
              </div>
            </div>

            {/* Producto #2 */}
            <div className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img src="/Galletas/CHOCOCHIP.jpg" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-md text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      Chocochips
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Galletas</p>
                </div>
                <p className="text-md font-medium text-gray-900">$500</p>
              </div>
            </div>

            {/* Producto #3 */}
            <div className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img src="/Pasteles/PASTEL_BROWNIE.jpg" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-md text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      Pastel Brownie
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Pastel</p>
                </div>
                <p className="text-md font-medium text-gray-900">$500</p>
              </div>
            </div>

            {/* Producto #4 */}
            <div className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img src="/Individuales/COPITAS.jpg" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-md text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      Copitas
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Individuales</p>
                </div>
                <p className="text-md font-medium text-gray-900">$500</p>
              </div>
            </div>

          </div>

        </div>
      </div>

    </main>
  );
}
