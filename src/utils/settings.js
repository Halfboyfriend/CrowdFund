const formatter = (address) =>{
    const newaddress = address.substring(0, 5) + '...' + address.substring(37, address.length);
    return newaddress;
}

export default formatter