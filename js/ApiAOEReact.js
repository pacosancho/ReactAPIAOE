


/**
 * Saca todas las civilizaviones para el select
 *
 * @class SelectCiv
 * @extends {React.Component}
 */
class SelectCiv extends React.Component {
    
/**
 *Creates an instance of SelectCiv.
 * @param {*} props
 * @memberof SelectCiv
 */
constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          civs: []
        };
      }
    /**
     *
     *
     * @memberof SelectCiv
     */
    componentDidMount() {
        fetch("https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                civs: result.civilizations,
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    /**
     *
     *
     * @param {*} civs
     * @memberof SelectCiv
     */
    managerCivs(civs){
        
        this.props.managerCivs(civs)
     }
    /**
     *
     *
     * @memberof SelectCiv
     */
    eventChange() {
    if($('#selCiv option:selected').text()!=='Selecciona Civilización')
        $('.hided').show(300)
   else
      $('.hided').hide(300)
   
    }
    /**
     *
     *
     * @returns Un select
     * @memberof SelectCiv
     */
    render() {
        const { error, isLoaded, civs } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Cargando...</div>;
        } else {
          this.managerCivs(civs)
         
            civs.splice(0,0,{id:1,name:"Selecciona Civilización"})
          return (
            <div className="form-group">
            {/* <label htmlFor="selCiv">Selecciona civilización</label> */}
            <select onChange={this.eventChange} className="form-control" id="selCiv">
            {civs.map((value,index)=>{return <option value={value.id} key={index}>{value.name}</option> })}
     
            </select>
          </div>
          );
        }

    }
   
  }
  
  /**
   *
   *
   * @class ShowArmyType
   * @extends {React.Component}
   */
  class ShowArmyType extends React.Component {
    
    /**
     *Creates an instance of ShowArmyType.
    * @param {*} props
    * @memberof ShowArmyType
    */
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          armyType: null
        };
      }
     /**
      *
      *
      * @memberof ShowArmyType
      */
     miAjax() {
          let armyTVal=$('#selCiv').val()
      
        
        fetch(`https://age-of-empires-2-api.herokuapp.com/api/v1/civilization/${armyTVal}`)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                armyType: result.army_type
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
        
      }


/**
 *
 *
 * @returns El tipo de ejercito
 * @memberof ShowArmyType
 */
render() {
       
    
            this.miAjax()
        const { error, isLoaded, armyType } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        
          }else  {
          
          return (
           <div className="hided">
             <h4>Tipo de ejercito</h4>
             <p>{armyType}</p>
          </div>
          );
        }

    }
   
  }



/**
 * Muestra el bnus de civilización de  la legida
 *
 * @class ShowCivBonus
 * @extends {React.Component}
 */
class ShowCivBonus extends React.Component {
    
/**
 *Creates an instance of ShowCivBonus.
 * @param {*} props
 * @memberof ShowCivBonus
 */
constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false
         
        };
      }
     /**
      *
      *
      * @memberof ShowCivBonus
      */
     miAjax() {
          let civilizationBonus=$('#selCiv').val()
      
    
          fetch(`https://age-of-empires-2-api.herokuapp.com/api/v1/civilization/${civilizationBonus}`)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                civBonus: result.civilization_bonus
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
        

        
        
      }


/**
 *
 *
 * @returns El bonus de civilización
 * @memberof ShowCivBonus
 */
render() {
       
    
            this.miAjax()
        const { error, isLoaded, civBonus } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        
          }else  {
          
          return (<div className="hided">
            <h4>Bonus de civilización</h4>
          <p>{civBonus}</p>
          </div>
          );
        }

    }
   



  }



/**
 * Muestra tdas las civilizaciones que ha recbido del componente SelectCiv
 *
 * @class ShowAll
 * @extends {React.Component}
 */
class ShowAll extends React.Component {
    

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          civsOfChild:null
        };
      }

 

  
    eventChange() {
        $('.hided').toggle(300)
    }

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
          return <div>Error: {error.message}</div>;
        } else {
           
          return (
            <div className="hided">
                <h4>Lista de civilizaciones</h4>
          {//this.props.civsOfChild.map((value,index)=>{return <p key={index}> {value.name}</p> })
         // <p>{this.props.civsMainApp}</p>
         this.props.civsMainApp.map((value,index)=>{return <p  key={index}> {value.name}</p> })
          }
            </div>
          );
        }

    }
   
  }




/**
 * Componente principal
 *
 * @class MainApp
 * @extends {React.Component}
 */
class MainApp extends React.Component {
    

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          civsMainApp:null
          
        };
      }

       //https://medium.com/@ruthmpardee/passing-data-between-react-components-103ad82ebd17
      parentManagerCivs = (civsSelectList)=>{
        
        console.log(civsSelectList)
        localStorage.setItem('civs', JSON.stringify(civsSelectList))
        //this.setState({ civsMainApp: civsSelectList })
       //return civsSelectList
      }
      

    render() { 
     
      let civsLocalStorage=JSON.parse(localStorage.getItem('civs'))
                return  (<div>
                        <SelectCiv managerCivs={this.parentManagerCivs}/>
                        <ShowArmyType/>
                        <ShowCivBonus/>
                        <ShowAll   civsMainApp={civsLocalStorage}/>
                    </div>)
        
           }
           /*return  (<div>
                 <SelectCiv manageCivId={this.myCallback}/>
                 
            </div>)
        
           }*/
    }
   
  

  ReactDOM.render(<MainApp/>,document.getElementById('app'))











/*
HACER QUE FUNCIONE  DE ESTE MODO SI DA TIEMPO
 class SelectCiv extends React.Component {
    
    options() {
       
        const url = `https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations`
       
        $('#overlay').fadeIn(300)
      
        console.log(url)
        $.getJSON(url, {
       })
      
          .done(function (response) {
            // sort of a long dump you will need to sort through
            console.log(response)
      
            return (
         
                <div class="form-group">
                <label for="exampleFormControlSelect1">Example select</label>
                <select class="form-control" id="exampleFormControlSelect1">
                
                <option>
                    {response.civilizations.forEach(civ => {
                    civ['name']})}
                    </option>
               
                </select>
              </div>
              )

          })
          .fail(function (response) {
            // the error codes are listed on the dev site
            console.log(response)
          
          })
          .always(function () {
            $('#overlay').fadeOut(300)
          })
         
      }
       

      
  
    render() {
       this.options()
    }
   
  }*/
