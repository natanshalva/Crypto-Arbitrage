 const str ='why dont [i,you] want to [kiss,hug] [her,him]'
//const str ='אני [רוצה,צריך] לבדוק את זה [בעברית, אנגלית]'

const build = (str)=>{
  const sectionEnd = str.indexOf(']');
  console.log('sectionEnd : ',sectionEnd);
  if(sectionEnd===-1){
    return [str];
  }
  const [prefix,variants] = str.split(/\[|\]/i,2);
  console.log('prefix: ', prefix);
  console.log('variants: ', variants);

  const gg =  str.slice(sectionEnd+1);
  console.log('gg: ',gg);
  const suffixes= build(gg);
  console.log('----------');
  console.log('suffixes: ',suffixes);

 // console.log('---------- _______ ------------');
  const variantsArr = variants.split(',');

  const arrays= variantsArr.map(
      variant=>{
         return suffixes.map(suffix=>prefix + variant + suffix);
      }
  );

  return   [].concat.apply([], arrays);
}

console.log(build(str));