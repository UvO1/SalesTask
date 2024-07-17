
type TInfo = {
    name: string,
    count: number
};

type TArrProducts = Array<TInfo>;
type TMapResult = Map<string, TArrProducts>;

function isMapHasName(map: TMapResult, name: string){
    let result: boolean = map.has(name);
    return result;
}

function isNameHasProduct(map: TMapResult, product: string): boolean{
    let result: boolean = false;
    if(map.has(product)){
        result = true;
    }
    else{
        result = false;
    }
    return result;
}

function indexOfProduct(arr: TArrProducts | undefined, product: string): number{
    let index: number = -1;
    if(arr){
        index = arr.findIndex((elem) => elem['name'] == product);
    } 
    return index;
}

function getCountOfProduct(arr: TArrProducts, id: number): number{
    let count: number = arr[id]["count"];
    return count;
}

function updateProductCount(arr_products: TArrProducts, product: string, count: number){
        const index_of_product = indexOfProduct(arr_products, product);

        if(index_of_product != -1) {
            const temp_count: number = getCountOfProduct(arr_products, index_of_product);
            let new_count: number = count + temp_count;
            arr_products[index_of_product]["count"] = new_count;
        }
        else {
            const new_info_product: TInfo = {
                name: product,
                count: count
            };
            arr_products.push(new_info_product);
        }

        return arr_products;
}

function getSortedArray(set_names: Set<string>){
    const arr: Array<string> = Array.from(set_names);
    arr.sort((a: string, b: string): number => {return a.localeCompare(b)});
    return arr;
}

function createNewInfo(product: string, count: number): TArrProducts{
    const info = {
        name: product,
        count: count
    }
    const arr: Array<TInfo> = [];
    arr.push(info);
    return arr;
}

function printResult(map: TMapResult, names: Array<string>){
    names.map((name: string) => {
        console.log(name+':');
        const temp_products: TArrProducts | undefined = map.get(name);
        temp_products?.sort((a: TInfo, b: TInfo): number => a['name'].localeCompare(b['name']));
        temp_products?.map((elem: TInfo) => {
            console.log(elem["name"], elem["count"]);
        });
    });    
}

function taskSolver(info: Array<string>){
    const result = new Map();
    const names: Set<string> = new Set();
    
    info.map((line: string) => {
        const tempArr: Array<string> = line.split(' ');
        const name: string = tempArr[0];
        const product: string = tempArr[1];
        const count: number = parseInt(tempArr[2]);

        if(isMapHasName(result, name)) {
            const temp_products: TArrProducts = result.get(name);
            const updated_info_product: TArrProducts = updateProductCount(temp_products, product, count)
            result.set(name, updated_info_product);
        }
        else {
            const new_arr_products:TArrProducts = createNewInfo(product, count);
            result.set(name, new_arr_products);
        }
        names.add(name);
    });

    const sorted_array: Array<string> = getSortedArray(names);
    printResult(result, sorted_array);
}


let inputData: string = "Ivanov paper 10\nPetrov pens 5\nIvanov marker 3\nIvanov paper 7\nPetrov envelope 20\nIvanov envelope 5\nArn zen 1\nPetrov zen 1\nIvanov paper 1";
let inputArr: Array<string> = inputData.split('\n');

taskSolver(inputArr);

