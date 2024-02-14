import Filter from "./Filter";

export function Layout({ children }) {
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <Filter />
        <div className="h-full mt-4 md:mt-0 w-full">{children}</div>
      </div>
    </section>
  );
}
