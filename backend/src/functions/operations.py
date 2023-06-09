from datetime import datetime
#from main import driver
from neo4j import GraphDatabase

uri = "neo4j+s://5594cb00.databases.neo4j.io"
username = "neo4j"
password = "tUBHO1gPQoDRTvF7l8iyrTB1dTrrjU5ZMI1idIKCSmY"
driver = GraphDatabase.driver(uri, auth=(username, password))

def result_to_list(result):
    nodes = []
    for record in result:
        node_dict = dict(record.value().items())
        node_dict["id"] = record.value().id
        nodes.append(node_dict)
    return nodes

#User

def get_user_id(user):
    with driver.session() as session:
        query = """
            MATCH (u:User)
            WHERE u.email = $email AND u.password = $password 
            RETURN u
        """
        try:
            result = session.run(query, email=user["email"], password=user["password"]).single()
            user = dict(result["u"])
            user["id"] = result["u"].id
            profiles = get_user_profiles(user["id"])
            return user, profiles
        except:
            return {'found': False}


def create_user(user):
    with driver.session() as session:
        query = """
            CREATE (u:User {email: $email, password: $password,
                           name: $name, type: $client, active: True})
            RETURN u
        """
        result = session.run(query, email=user["email"], password=user["password"],
        name=user["name"], client=user["type"]).single()
    
    user = dict(result["u"])
    user["id"] = result["u"].id
        
    profiles = create_profile(user["id"], {"name": user["name"], 'icon': 'profile1.png'})
    
    return {"user": user, "profiles": profiles}
        
def update_user(user_id, user):
    with driver.session() as session:
        query = """
            MATCH (u:User)
            WHERE ID(u) = $user_id
            SET u.email = $email, u.password = $password, u.name = $name, active = $active
        """
        session.run(query, user_id=user_id, email=user["email"],
                    password=user["password"], name=user["name"],
                    active=user["active"])

def delete_user(user_id):
    with driver.session() as session:
        query = """
            MATCH (u:User)-[:OWNS]->(p:Profile)
            WHERE ID(u) = $user_id
            DETACH DELETE u, p
        """
        session.run(query, user_id=user_id)

def read_user(user_id):
    with driver.session() as session:
        query = """
            MATCH (u:User)
            WHERE ID(u) = $user_id
            RETURN u
        """
        result = session.run(query, user_id=user_id).single()
        user = dict(result["u"])
        user["id"] = result["u"].id
        
        return user

#Profile

def get_user_profiles(user_id):
    with driver.session() as session:
        query = """
            MATCH (u:User)-[:OWNS]->(p:Profile)
            WHERE ID(u) = $user_id
            RETURN p
        """
        result = session.run(query, user_id=user_id)
        return result_to_list(result)

def create_profile(user_id, profile):
    with driver.session() as session:
        query = """
            MATCH (u:User) WHERE id(u) = $user_id 
            CREATE (p:Profile {name: $name, icon: $icon, recommendations: $recommendations})
            CREATE (u)-[:OWNS]->(p)
        """
        movies = get_10_movies()
        recommendations = [item["id"] for item in movies]
        session.run(query, user_id=user_id, name=profile["name"], icon=profile["icon"], 
                    recommendations=recommendations)
    return get_user_profiles(user_id)

def update_profile(user_id, profile_id, profile):
    with driver.session() as session:
        query = """
            MATCH (p:Profile)
            WHERE ID(p) = $profile_id
            SET p.name = $name, p.icon = $icon, p.recommendations = $recommendations
        """
        session.run(query, profile_id=profile_id, name=profile["name"], icon=profile["icon"],
                    recommendations=profile["recommendations"])
    return get_user_profiles(user_id)

def delete_profile(user_id, profile_id):
    with driver.session() as session:
        query = """
            MATCH (p:Profile)
            WHERE ID(p) = $profile_id
            DETACH DELETE p
        """
        session.run(query, profile_id=profile_id)
    return get_user_profiles(user_id)

def read_profile(profile_id):
    with driver.session() as session:
        query = """
            MATCH (p:Profile)
            WHERE ID(p) = $profile_id
            RETURN p
        """
        result = session.run(query, profile_id=profile_id)
        profile = dict(result["p"])
        profile["id"] = result["p"].id
        
        return profile

def get_recommendations(profile_id):
    with driver.session() as session:
        query = """
            MATCH (p:Profile)
            WHERE ID(p) = $profile_id
            RETURN p.recommendations as r
        """
        result = session.run(query, profile_id=profile_id)
        movie_ids = result.single()["r"]
    
    return read_movies(movie_ids)

#Movie

def read_movies(movie_ids):
    with driver.session() as session:
        query = """
            MATCH (m:Movie)
            WHERE ID(m) IN $movie_ids
            RETURN m
        """
        result = session.run(query, movie_ids=movie_ids)
        return result_to_list(result)

def get_all_movies():
    with driver.session() as session:
        query = """
            MATCH (m:Movie)
            RETURN m
        """
        result = session.run(query)
        return result_to_list(result)
    
def get_10_movies():
    with driver.session() as session:
        query = """
            MATCH (m:Movie)
            RETURN m
            LIMIT 10
        """
        result = session.run(query)
        return result_to_list(result)

#Actor

def get_all_actors():
    with driver.session() as session:
        query = """
            MATCH (a:Actor)
            RETURN a
        """
        result = session.run(query)
        return result_to_list(result)

#Director

def get_all_directors():
    with driver.session() as session:
        query = """
            MATCH (d:Director)
            RETURN d
        """
        result = session.run(query)
        return result_to_list(result)

#Genre

def get_all_genres():
    with driver.session() as session:
        query = """
            MATCH (g:Genre)
            RETURN g
        """
        result = session.run(query)
        return result_to_list(result)

#LIKED

def create_liked(profile_id, movie_id):
    with driver.session() as session:
        query = """
            MATCH (p:Profile), (m:Movie)
            WHERE ID(p) = $profile_id AND ID(m) = $movie_id
            CREATE (p)-[:LIKED]->(m)
        """
        session.run(query, profile_id=profile_id, movie_id=movie_id)
        
def delete_liked(profile_id, movie_id):
    with driver.session() as session:
        query = """
            MATCH (p:Profile)-[r:LIKED]->(m:Movie)
            WHERE ID(p) = $profile_id AND ID(m) = $movie_id
            DELETE r
        """
        session.run(query, profile_id=profile_id, movie_id=movie_id) 

def profile_liked(profile_id):
    with driver.session() as session:
        query = """
            MATCH (p:Profile)-[r:LIKED]->(m:Movie)
            WHERE ID(p) = $profile_id
            RETURN m
        """
        result = session.run(query, profile_id=profile_id)
        return result_to_list(result)

#DISLIKED

def create_disliked(profile_id, movie_id):
    with driver.session() as session:
        query = """
            MATCH (p:Profile), (m:Movie)
            WHERE ID(p) = $profile_id AND ID(m) = $movie_id
            CREATE (p)-[:DISLIKED]->(m)
        """
        session.run(query, profile_id=profile_id, movie_id=movie_id)  

def delete_disliked(profile_id, movie_id):
    with driver.session() as session:
        query = """
            MATCH (p:Profile)-[r:DISLIKED]->(m:Movie)
            WHERE ID(p) = $profile_id AND ID(m) = $movie_id
            DELETE r
        """
        session.run(query, profile_id=profile_id, movie_id=movie_id) 

def profile_disliked(profile_id):
    with driver.session() as session:
        query = """
            MATCH (p:Profile)-[r:DISLIKED]->(m:Movie)
            WHERE ID(p) = $profile_id
            RETURN m
        """
        result = session.run(query, profile_id=profile_id)
        return result_to_list(result)
    
#WATCH_LATER

def create_watch_later(profile_id, movie_id):
    with driver.session() as session:
        query = """
            MATCH (p:Profile), (m:Movie)
            WHERE ID(p) = $profile_id AND ID(m) = $movie_id
            CREATE (p)-[:WATCH_LATER]->(m)
        """
        session.run(query, profile_id=profile_id, movie_id=movie_id)  

def delete_watch_later(profile_id, movie_id):
    with driver.session() as session:
        query = """
            MATCH (p:Profile)-[r:WATCH_LATER]->(m:Movie)
            WHERE ID(p) = $profile_id AND ID(m) = $movie_id
            DELETE r
        """
        session.run(query, profile_id=profile_id, movie_id=movie_id) 

def profile_watch_later(profile_id):
    with driver.session() as session:
        query = """
            MATCH (p:Profile)-[r:WATCH_LATER]->(m:Movie)
            WHERE ID(p) = $profile_id
            RETURN m
        """
        result = session.run(query, profile_id=profile_id)
        return result_to_list(result)

#RATED

def create_rated(profile_id, movie_id, rating):
    with driver.session() as session:
        query = """
            MATCH (p:Profile), (m:Movie)
            WHERE ID(p) = $profile_id AND ID(m) = $movie_id
            CREATE (p)-[:RATED {rating: $rating}]->(m)
        """
        session.run(query, profile_id=profile_id, movie_id=movie_id, rating=rating)
        
def delete_rated(profile_id, movie_id):
    with driver.session() as session:
        query = """
            MATCH (p:Profile)-[r:RATED]->(m:Movie)
            WHERE ID(p) = $profile_id AND ID(m) = $movie_id
            DELETE r
        """
        session.run(query, profile_id=profile_id, movie_id=movie_id) 

def profile_rated(profile_id):
    with driver.session() as session:
        query = """
            MATCH (p:Profile)-[r:RATED]->(m:Movie)
            WHERE ID(p) = $profile_id
            RETURN m, properties(r) AS r
            """
        result = session.run(query, profile_id=profile_id)
        movies = []
        for record in result:
            movie_dict = dict(record["m"].items())
            rating_props = dict(record["r"])
            movie_dict["r"] = rating_props
            movies.append(movie_dict)
        return movies

#WATCHED
def create_watched(profile_id, movie_id):
    with driver.session() as session:
        query = """
            MATCH (p:Profile), (m:Movie)
            WHERE ID(p) = $profile_id AND ID(m) = $movie_id
            CREATE (p)-[:RATED {first_date: $date, last_date: $date,
                                minute: 0, times: 1}]->(m)
        """
        date = datetime.now().date()
        session.run(query, profile_id=profile_id, movie_id=movie_id, date=date)

def profile_watched(profile_id):
    with driver.session() as session:
        query = """
            MATCH (p:Profile)-[r:WATCHED]->(m:Movie)
            WHERE ID(p) = $profile_id
            RETURN m, properties(r) AS r
            """
        result = session.run(query, profile_id=profile_id)
        movies = []
        for record in result:
            movie_dict = dict(record["m"].items())
            rating_props = dict(record["r"])
            movie_dict["r"] = rating_props
            movies.append(movie_dict)
        return movies

#FOLLOW

def create_follow(profile_id, person_id):
    with driver.session() as session:
        query = """
            MATCH (p:Profile), (s:Person)
            WHERE ID(p) = $profile_id AND ID(s) = $person_id
            CREATE (p)-[:FOLLOW]->(s)
        """
        session.run(query, profile_id=profile_id, person_id=person_id)  

def delete_follow(profile_id, person_id):
    with driver.session() as session:
        query = """
            MATCH (p:Profile)-[r:FOLLOW]->(s:Person)
            WHERE ID(p) = $profile_id AND ID(s) = $person_id
            DELETE r
        """
        session.run(query, profile_id=profile_id, person_id=person_id) 

def profile_follow(profile_id):
    with driver.session() as session:
        query = """
            MATCH (p:Profile)-[r:FOLLOW]->(s:Person)
            WHERE ID(p) = $profile_id
            RETURN s
        """
        result = session.run(query, profile_id=profile_id)
        return result_to_list(result)

#FRIEND

def create_friend(profile_id_1, profile_id_2):
    with driver.session() as session:
        query = """
            MATCH (p1:Profile), (p2:Profile)
            WHERE ID(p1) = $profile_id_1 AND ID(p2) = $profile_id_1
            CREATE (p1)-[:FRIEND]->(p2)
            CREATE (p2)-[:FRIEND]->(p1)
        """
        session.run(query, profile_id_1=profile_id_1, profile_id_2=profile_id_2)  

def delete_friend(profile_id_1, profile_id_2):
    with driver.session() as session:
        query = """
            MATCH (p1:Profile)-[:FRIEND]-(p2:Profile)
            WHERE WHERE ID(p1) = $profile_id_1 AND ID(p2) = $profile_id_2
            DELETE r
        """
        session.run(query, profile_id_1=profile_id_1, profile_id_2=profile_id_2) 

def profile_friend(profile_id):
    with driver.session() as session:
        query = """
            MATCH (p1:Profile)-[r:Friend]-(p2:Profile)
            WHERE ID(p1) = $profile_id
            RETURN p2
        """
        result = session.run(query, profile_id=profile_id)
        return result_to_list(result)
