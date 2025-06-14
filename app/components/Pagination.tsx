import { Flex, Text } from "@radix-ui/themes";
import React from "react";
import Button from "./Button";
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}
const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
    const pageCount=Math.ceil(itemCount/pageSize);
    if(pageCount<=1)    return null;
  return <Flex align={"center"} gap="2">
    <Text size={"2"}>Page {currentPage} of {pageCount}</Text>
    <Button color="gray" variant="soft" disabled={currentPage===1} href="">
        <DoubleArrowLeftIcon/>
        
    </Button>
    <Button color="gray" variant="soft" disabled={pageCount===1} href="">
        <ChevronLeftIcon/>
        
    </Button>
    <Button color="gray" variant="soft" disabled={pageCount===1} href="">
        <ChevronRightIcon/>
        
    </Button>
    <Button color="gray" variant="soft" disabled={currentPage===pageCount} href="">
        <DoubleArrowRightIcon/>
        
    </Button>
    
  </Flex>
};

export default Pagination;
