type VehicleDetailPageProps = {
  params: Promise<{ slug: string }>
}

export default async function VehicleDetailPage({ params }: VehicleDetailPageProps) {
  const { slug } = await params

  return <div style={{ padding: 40 }}>Vehicle detail placeholder: {slug}</div>
}