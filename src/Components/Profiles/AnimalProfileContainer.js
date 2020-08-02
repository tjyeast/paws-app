import React, { Component } from 'react';
import { fetchCrittersByUser, fetchCritterDescription, verifyUser, addCritter, deleteCritter, } from '../../services/apihelper';
import ShowAnimal from './ShowAnimal';
import AddAnimal from '../Animals/AddAnimal'
import { Route, Link, withRouter } from 'react-router-dom';

class AnimalProfileContainer extends Component {
    constructor(props) {
        super(props); 

        this.state={
            animals: this.props.animals,
        }

    }

    async componentDidMount() {
        const user = verifyUser();
        this.pageSetup(user);
    }

    pageSetup = async(user) => {
        let animals;
        if(user) {
            animals = await (fetchCrittersByUser(this.props.user.id))
            animals.map( async (animal) => {
                const animalDescription = await(fetchCritterDescription(animal._id));
                animal.description = animalDescription;
                return animal
            })
        }
        console.log(animals);
         this.setState({
             animals
         })
    }



    addAnimal = async (e, values) => {
      e.preventDefault();
      const newCritter = await addCritter(values, this.props.user.id);
      console.log(newCritter);
      const animals = this.state.animals;
      animals.push(newCritter.data);
      this.setState({
        animals
      })
      this.props.history.push('/profile')
    }

    deleteAnimal = async (id) => {
        await deleteCritter(id);
        this.props.history.push('/profile')
      }



    render() {
        return (
            <div className="animal-container">
                <h2>Your Critters <img src="/tigerrr.png" alt="link" width="5%" /> </h2>

               <div className="profile-animals-main">

                   <div className="profile-animal-show">
                        {this.state.animals && this.state.animals.map(critter => {
                            return <div className="profile-animal-images"><Link to={`/critter/${critter._id}`}>
                                        <img src={critter.image} alt="animal" className="animal-profile-image" width="50%" /></Link>
                                    </div>

                            })}
                    </div>

                    <div className="profile-animals-add">
                        <div className="animal-title">
                            <p>Have a new Critter to add to your menagerie?</p>
                        </div>
                            <Link to='/critter/create' className="profile-animal-link">New Critter
                            <img src="/owl.png" alt="icon" width="15%" />
                            </Link>
                    </div>

                    {this.props.user &&
                    <Route path='/critter/create' render={() => {
                                return <AddAnimal handleSubmit={this.addAnimal}
                                user={this.props.user.id} animals={this.state.animals}/>
                    }}/>
                    }

                    <Route path='/critter/:id' render={(props) => {
                        return <ShowAnimal animals={this.state.animals} id={props.match.params.id} destroyAnimal={this.deleteAnimal} />
                    }}/>

                </div>

            </div>
        )
    }
}

export default withRouter(AnimalProfileContainer);
