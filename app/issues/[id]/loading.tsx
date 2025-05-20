import { Skeleton } from "@/app/components/index"
import { Box, Card, Flex, Heading } from '@radix-ui/themes'

const LoadingIssueDescription = () => {
  return (
     <Box className='max-w-xl'>
      <Heading><Skeleton/></Heading>
      <Flex gap="3" my="3">
        <Skeleton width={"5rem"}/>
        <Skeleton width={"8rem"}/>
      </Flex>
      <Card mt="4" className="prose">
        <Skeleton count={3}/>
      </Card>
    </Box>
  )
}

export default LoadingIssueDescription