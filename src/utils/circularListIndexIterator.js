export const circularListIndexIterator = (listSize) => {
    let index = 0;
  
    return {
      reset() {
        index = 0;
      },
      next() {
        index++;
      },
      prev() {
        index = (index <= 0 ? listSize : index) - 1;
      },
      get() {
        return index % listSize;
      },
    };
  };

  export default circularListIndexIterator;