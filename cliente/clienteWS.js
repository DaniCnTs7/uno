function ClienteWS() {
    this.socket
    this.nick
    this.estado
    this.codigo
    this.conectar = function() {
        this.socket = io()
        this.servidorWSCliente()
    }
    this.crearPartida = function(num, nick) {
        this.nick = nick
        this.socket.emit("crearPartida", num, nick)
    }
    this.unirAPartida = function(codigo, nick=this.nick) {
        this.nick = nick
        this.socket.emit("unirAPartida", codigo.id, nick)
    }
    this.manoInicial = function() {
        this.socket.emit("manoInicial", this.nick)
    }
    this.jugarCarta = function(num, nick) {
        this.socket.emit("jugarCarta", num, nick)
    }
    this.robarCarta = function(nick) {
        this.socket.emit("robarCarta", nick)
    }
    this.pasarTurno = function(nick) {
        this.socket.emit("pasarTurno", nick)
    }
    
    //servidor WS del cliente
    this.servidorWSCliente = function() {
        var cli = this
        this.socket.on("connect", function() {
            console.log("conectador al servidor WS")
        })
        this.socket.on("partidaCreada", function(data) {
            console.log(data)
            cli.codigo = data.codigo
            iu.mostrarCargando(data)
        })
        this.socket.on("nuevaPartida", function(data) {
            if (!cli.codigo && cli.nick && cli.estado) {
                $("#listaPartidas").remove()
                iu.mostrarListaPartidas(data)
            }
        })
        this.socket.on("nuevoMiembro", function(data) {
            console.log(data)
            if (cli.codigo == data.codigo && cli.nick) {
                $("#listaJugadores").remove()
                iu.mostrarCargando(data)
            }
        })
        this.socket.on("unidoAPartida", function(data) {
            console.log(data)
            cli.codigo = data.codigo
            iu.mostrarCargando(data)
        })
        this.socket.on("partidaEmpezada", function(data) {
            console.log(data)
            iu.mostrarTablero()
        })
        this.socket.on("pedirCartas", function(data) {
            cli.manoInicial()
        })
        this.socket.on("mano", function(data) {
            console.log(data)
            iu.mostrarMano(data)
        })
        this.socket.on("turno", function(data) {
            console.log(data)
        })
        this.socket.on("cartaJugada", function(data) {
            console.log(data)
        })
        this.socket.on("fallo", function(data) {
            console.log(data)
        })
    }

    this.conectar()
}