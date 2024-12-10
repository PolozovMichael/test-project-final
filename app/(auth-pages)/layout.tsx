export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full h-screen flex flex-col gap-12 items-start justify-center">{children}</div>
  )
}
