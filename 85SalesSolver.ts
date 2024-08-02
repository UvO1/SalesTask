type TInfo = {
  name: string;
  count: number;
};

type TMapProducts = Map<string, number>;
type TMapResult = Map<string, TMapProducts>;

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

function updateProductCount(
  arrProducts: TMapProducts,
  product: string,
  count: number
) {
  if (arrProducts.has(product)) {
    const temp_count: number | undefined = arrProducts.get(product);
    let new_count: number = count;
    if (temp_count) {
      new_count += temp_count;
    }
    arrProducts.set(product, new_count);
  } else {
    arrProducts.set(product, count);
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

function printResult(map: TMapResult, names: Array<string>) {
  names.map((name: string) => {
    console.log(name + ":");
    const tempProducts: TMapProducts | undefined =
      map.get(name) !== undefined ? map.get(name) : new Map<string, number>();
    if (tempProducts) {
      const tArry = Array.from(tempProducts, ([name, count]) => ({
        name,
        count,
      }));
      tArry?.sort((a: TInfo, b: TInfo): number => a.name.localeCompare(b.name));
      tArry?.map((elem: TInfo) => {
        console.log(elem.name, elem.count);
      });
    }
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
      const tempProducts: Map<string, number> = result.get(name);
      const updatedInfoProduct: TMapProducts = updateProductCount(
        tempProducts,
        product,
        count
      );
      result.set(name, updatedInfoProduct);
    } else {
      const newArrProducts: Map<string, number> = new Map<string, number>();
      newArrProducts.set(product, count);
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
