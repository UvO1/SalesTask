type TInfo = {
  name: string;
  count: number;
};

type TArrProducts = Array<TInfo>;
type TMapResult = Map<string, TArrProducts>;

function isMapHasName(map: TMapResult, name: string) {
  let result: boolean = map.has(name);
  return result;
}

function isNameHasProduct(map: TMapResult, product: string): boolean {
  let result: boolean = false;
  if (map.has(product)) {
    result = true;
  } else {
    result = false;
  }
  return result;
}

function getCountOfProduct(arr: TArrProducts, id: number): number {
  let count: number = arr[id].count;
  return count;
}

function updateProductCount(
  arrProducts: TArrProducts,
  product: string,
  count: number
) {
  const indexTempProduct = arrProducts.findIndex((elem) => elem.name === product);

  if (indexTempProduct != -1) {
    const temp_count: number = getCountOfProduct(
      arrProducts,
      indexTempProduct
    );
    let new_count: number = count + temp_count;
    arrProducts[indexTempProduct].count = new_count;
  } else {
    const new_info_product: TInfo = {
      name: product,
      count: count,
    };
    arrProducts.push(new_info_product);
  }

  return arrProducts;
}

function getSortedArray(setNames: Set<string>) {
  const arr: Array<string> = Array.from(setNames);
  arr.sort((a: string, b: string): number => {
    return a.localeCompare(b);
  });
  return arr;
}

function createNewInfo(product: string, count: number): TArrProducts {
  const info = {
    name: product,
    count: count,
  };
  const arr: Array<TInfo> = [];
  arr.push(info);
  return arr;
}

function printResult(map: TMapResult, names: Array<string>) {
  names.map((name: string) => {
    console.log(name + ":");
    const tempProducts: TArrProducts | undefined = map.get(name);
    tempProducts?.sort((a: TInfo, b: TInfo): number =>
      a.name.localeCompare(b.name)
    );
    tempProducts?.map((elem: TInfo) => {
      console.log(elem.name, elem.count);
    });
  });
}

function taskSolver(info: Array<string>) {
  const result = new Map();
  const names: Set<string> = new Set();

  info.map((line: string) => {
    const tempArr: Array<string> = line.split(" ");
    const name: string = tempArr[0];
    const product: string = tempArr[1];
    const count: number = parseInt(tempArr[2]);

    if (isMapHasName(result, name)) {
      const tempProducts: TArrProducts = result.get(name);
      const updatedInfoProduct: TArrProducts = updateProductCount(
        tempProducts,
        product,
        count
      );
      result.set(name, updatedInfoProduct);
    } else {
      const newArrProducts: TArrProducts = createNewInfo(product, count);
      result.set(name, newArrProducts);
    }
    names.add(name);
  });

  const sortedArray: Array<string> = getSortedArray(names);
  printResult(result, sortedArray);
}

let inputData: string =
  "Ivanov paper 10\nPetrov pens 5\nIvanov marker 3\nIvanov paper 7\nPetrov envelope 20\nIvanov envelope 5\nArn zen 1\nPetrov zen 1\nIvanov paper 1";
let inputArr: Array<string> = inputData.split("\n");

taskSolver(inputArr);
