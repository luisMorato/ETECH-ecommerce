interface salesStatisticsProps {
    token: string | undefined
}

const SalesStatistics = ({ token }: salesStatisticsProps) => {
  return (
    <div>
        Sales Statistics
        {token}
    </div>
  )
}

export default SalesStatistics;