//Botones
var btAgregar = document.querySelector("#btAgregar");
var btAgregarIn = document.querySelector("#btAgregarIn")
var btBorrar = document.querySelector("#btBorrar");
var btBorrarIn = document.querySelector("#btBorrarIn")
var btBuscar = document.querySelector("#btBuscar");
var btListar = document.querySelector("#btListar");
var btListarIn = document.querySelector("#btListarIn");

//Inputs
var codigoPro = document.querySelector("#codigoPro");
var nombrePro = document.querySelector("#nombrePro");
var descPro = document.querySelector("#descPro");
var costoPro = document.querySelector("#costoPro");
var cantPro = document.querySelector("#cantPro");
var posicion = document.querySelector("#posiPro");
var borrarPro = document.querySelector("#borrarPro");
var buscarPor = document.querySelector("#buscarPro");
var lista = document.querySelector("#listado");

class Producto{
    constructor(codigo, nombre, descripcion, costo, cantidad){
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.costo = costo;
        this.cantidad = cantidad;
        this.siguiente = null;
    }
    valor(){
        let cantidad = this.cantidad;
        let costo = this.costo;
        let valor = cantidad * costo;
        return valor;
    }
    articleToHtml(){
        let productString = '<li class="list-group-item">';
        for(let key in this){
            productString += `<div><strong>${key}:</strong> ${this[key]}</div>`;
        }
        let valor_string = `<div><strong>Valor Total:</strong> ${this.valor()}</div>`;
        return productString + valor_string + "</li>";
    }
}

class Inventario{
    constructor(){
        this.inicio = null;
        this.tamaño = 0;
    }
    
    agregarP(nuevo){
        if(this.inicio === null){
            this.inicio = nuevo;
        }else{
            let aux = this.inicio;
            while(aux.siguiente !== null){
                aux = aux.siguiente;
            }
            aux.siguiente = nuevo;
        }
        this.tamaño++;
        document.getElementById("form_1").reset();
        this.listaP();
    }

    posicionP(nuevo, posicion){
        if(posicion < 0 || this.cantPro.length >= this.tamaño){
            return null;
        }else{
            let aux = this.inicio;
            let anterior;
            if(posicion ===  0){
                nuevo.siguiente = aux;
                this.inicio = nuevo;
            }else{
                for(let i = 0; i < posicion; i++){
                    anterior = aux;
                    aux = aux.siguiente;
                }
                nuevo.siguiente = aux;
                anterior.siguiente = nuevo;
            }
            this.tamaño++;
        }
        return nuevo.nuevo;
    }

    agregarInicio(nombre){
        let aux = this.inicio;
        while(aux != null){
            if (aux.codigo == nombre.codigo){
                return null;
            }
            aux = aux.siguiente
        }
        nombre.siguiente = this.inicio
        this.inicio = nombre
    }

    borrarInicio(){
        let aux = this.inicio;
        this.inicio = this.inicio.siguiente;
        aux.siguiente = null;
        document.getElementById("form_2").reset();
        this.listaP();
        return aux;
    }

    borrarP(codigo){
        if(this.inicio == null){
            return null
        }
        else if(this.inicio.codigo == codigo){
            return this.borrarInicio();
        }
        else{
            let aux = this.inicio
            while (aux.siguiente !== null || aux.siguiente.codigoPro !== codigo){
                aux = aux.siguiente
            }
            if (aux.siguiente !== null){
                let temp = aux.siguiente;
                aux.siguiente = temp.siguiente;
                temp.siguiente = null;
                document.getElementById("form_2").reset();
                this.listaP();
                return temp;
            }else{
                return null
                
            }
            
        }
        
    }

    buscarP(codigo){
        if(this.inicio == null){
            return null
        }
        else if(this.inicio.codigo == codigo){
            return this.inicio
        }
        else{
            let aux = this.inicio
            while(aux.codigo != codigo && aux.siguiente != null){
                aux = aux.siguiente
            }
            if(aux.siguiente == null || aux.codigo != codigo){
                return null
            }
            else{
                return aux
            } 
        }
    }

    listaP() {
        lista.innerHTML = "";
        if(this.tamaño === 0){
            return null;
        }
        let aux = this.inicio;
        while(aux){
            lista.innerHTML += aux.articleToHtml();
            aux = aux.siguiente;
        }
    }

    listaPIn() {
        lista.innerHTML = "";
        if(this.inicio == null){
            return null;
        }
        let aux = this.inicio;
        while(aux !== null){
            lista.innerHTML += aux.articleToHtml();
            aux = aux.siguiente;
        }
    }
}
let inventario = new Inventario();
//Agregar
btAgregar.addEventListener("click", () => {
  let newProdcuto = new Producto(codigoPro.value, nombrePro.value, descPro.value, costoPro.value, cantPro.value);
  inventario.agregarP(newProdcuto);
  console.log(newProdcuto)
  
});

//Agregar Inicio
btAgregarIn.addEventListener("click", () => {
    inventario.agregarInicio();
})

//Borrar
btBorrar.addEventListener("click", () => {
  inventario.borrarP(borrarPro.value);
  
});

//Borrar Inicio
btBorrarIn.addEventListener("click", () => {
    inventario.borrarInicio();
})

//Buscar
btBuscar.addEventListener("click", () => {
  inventario.buscarP(buscarPor.value);
  
});

//Lista
btListar.addEventListener("click", () => {
  inventario.listaP();
});

//Listar inverso
btListarIn.addEventListener("click", () => {
  inventario.listaPIn();
});
