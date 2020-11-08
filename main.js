//Botones
var btAgregar = document.querySelector("#btAgregar");
var btAgregarIn = document.querySelector("#btAgregarIn")
var btBorrar = document.querySelector("#btBorrar");
var btBorrarIn = document.querySelector("#btBorrarIn")
var btBuscar = document.querySelector("#btBuscar");
var btListar = document.querySelector("#btListar");
var btListarIn = document.querySelector("#btListarIn");

//Inputs
var codigo = document.querySelector("#codigoPro");
var nombre = document.querySelector("#nombrePro");
var descripcion = document.querySelector("#descPro");
var costo = document.querySelector("#costoPro");
var cantidad = document.querySelector("#cantPro");
var posicion = document.querySelector("#posiPro");
var borrarPro = document.querySelector("#borrarPro");
var buscarPro = document.querySelector("#buscarPro");
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

    posicionP(nombre, posicion){
        if(this.inicio == null){
            return false;
        }
        let aux = this.inicio;
        while (aux != null){
            if (nombre.codigo == aux.codigo){
                return false;
            }
            aux = aux.siguiente;
        }
        aux = this.inicio;
        let i = 1;
        while(i < posicion - 1 && aux != null){
            aux = aux.siguiente;
            i++;
        }
        if(aux == null){
            return false;
        }
        let temp = aux.siguiente;
        aux.siguiente = nombre;
        aux.siguiente.siguiente = temp;   
        document.getElementById("form_1").reset();
        this.listaP();
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
        document.getElementById("form_1").reset();
        this.listaP();
    }

    borrarInicio(){
        let aux = this.inicio;
        this.inicio = this.inicio.siguiente;
        aux.siguiente = null;
        this.listaP();
        return aux;
    }

    borrarP(codigo){
        let aux = this.inicio;
        let anterior = null;

        while(aux != null){
            if(aux.codigo === codigo){
                if(!anterior){
                    this.inicio = aux.siguiente;
                } else{
                    anterior.siguiente = aux.siguiente;
                };
                this.tamaño--;
                document.getElementById("form_2").reset();
                return (this.listaP(), aux.codigo);
            };
            anterior = aux;
            aux = aux.siguiente;
        };
        return null;    
    }

    buscarP(codigo){
        if(this.inicio == null){
            return null;
        };
        let aux = this.inicio;
        while(aux){
            if(aux.codigo == codigo){
                return (this. listaP(), aux);
            };
            aux = aux.siguiente;
        };
        return null;
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
    if(posicion.value == ""){
        let newProdcuto = new Producto(codigo.value, nombre.value, descripcion.value, costo.value, cantidad.value);
        inventario.agregarP(newProdcuto);
    }else{
        let nuevo = new Producto(codigo.value, nombre.value, descripcion.value, costo.value, cantidad.value);
        inventario.posicionP(nuevo);
        
    }
});

//Agregar Inicio
btAgregarIn.addEventListener("click", () => {
    let nuevo = new Producto(codigo.value, nombre.value, descripcion.value, costo.value, cantidad.value);
    inventario.agregarInicio(nuevo);
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
  inventario.buscarP(buscarPro.value);
});

//Lista
btListar.addEventListener("click", () => {
  inventario.listaP();
});

//Listar inverso
btListarIn.addEventListener("click", () => {
  inventario.listaPIn();
});
