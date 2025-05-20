import { Box, Heading, Flex, Card } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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