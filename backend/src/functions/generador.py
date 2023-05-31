import numpy as np
from datetime import datetime, timedelta
from neo4j import GraphDatabase
from py2neo import Graph
import networkx as nx

uri = "neo4j+s://5594cb00.databases.neo4j.io"
username = "neo4j"
password = "tUBHO1gPQoDRTvF7l8iyrTB1dTrrjU5ZMI1idIKCSmY"
driver = GraphDatabase.driver(uri, auth=(username, password))

def random_date(start, end):
    start_date = datetime.strptime(start, "%Y-%m-%d")
    end_date = datetime.strptime(end, "%Y-%m-%d")
    # Generate a random date within the specified range
    random_days = np.random.randint(0, (end_date - start_date).days)
    random_date = start_date + timedelta(days=random_days)
    return random_date.strftime("%Y-%m-%d")


# Function to create the "LIKED" relationship for a given user, profile, and movie
def create_liked_relationship(user, profile, movie):
    with driver.session() as session:
        query = """
            MATCH (u:User {email: $user})
            WITH u
            MATCH (u)-[:OWNS]->(p:Profile {name: $profile})
            WITH p
            MATCH (m:Movie {title: $movie})
            CREATE (p)-[:LIKED]->(m)
            """
        session.run(query, user=user, profile=profile, movie=movie)
        
def create_disliked_relationship(user, profile, movie):
    with driver.session() as session:
        query = """
            MATCH (u:User {email: $user})
            WITH u
            MATCH (u)-[:OWNS]->(p:Profile {name: $profile})
            WITH p
            MATCH (m:Movie {title: $movie})
            CREATE (p)-[:DISLIKED]->(m)
            """
            
        session.run(query, user=user, profile=profile, movie=movie)

def create_watch_later_relationship(user, profile, movie):
    with driver.session() as session:
        # Find the user node
        query = """
            MATCH (u:User {email: $user})
            WITH u
            MATCH (u)-[:OWNS]->(p:Profile {name: $profile})
            WITH p
            MATCH (m:Movie {title: $movie})
            CREATE (p)-[:WATCH_LATER]->(m)
            """
            
        session.run(query, user=user, profile=profile, movie=movie)

def create_rated_relationship(user, profile, movie, rating):
    with driver.session() as session:
        # Find the user node
        query = """
            MATCH (u:User {email: $user})
            WITH u
            MATCH (u)-[:OWNS]->(p:Profile {name: $profile})
            WITH p
            MATCH (m:Movie {title: $movie})
            CREATE (p)-[:RATED {rating: $rating}]->(m)
            """
        session.run(query, user=user, profile=profile, movie=movie, rating=rating)

def create_watched_relationship(user, profile, movie, details):
    with driver.session() as session:
        # Find the user node
        query = """
            MATCH (u:User {email: $user})
            WITH u
            MATCH (u)-[:OWNS]->(p:Profile {name: $profile})
            WITH p
            MATCH (m:Movie {title: $movie})
            CREATE (p)-[:WATCHED {
                first_date: $first_date,
                last_date: $last_date,
                minute: $minute,
                times: $times
            }]->(m)
            """
        session.run(query, user=user, profile=profile, movie=movie, **details)

def create_follow_relationship(user, profile, person):
    with driver.session() as session:
        query = """
            MATCH (u:User {email: $user})
            WITH u
            MATCH (u)-[:OWNS]->(p:Profile {name: $profile})
            WITH p
            MATCH (s:Person {name: $person})
            CREATE (p)-[:FOLLOW]->(s)
            """
        session.run(query, user=user, profile=profile, person=person)


def set_recommendations(node_id, recommendations):
    with driver.session() as session:
        query = """
        MATCH (p:Profile) 
        WHERE ID(p) = $node_id
        SET p.recommendations = $recommendations
        """
        session.run(query, node_id=node_id, recommendations=recommendations)


def user_movie_relationships(movies, profiles):
    for profile in profiles:
        print(profile)
        watched_prob = np.random.uniform(0.1, 0.4)
        rated_prob = np.random.uniform(0.05, 0.18)
        feedback_prob = np.random.uniform(0.08, 0.19)
        
        for movie in movies:
            watched = np.random.choice([True, False], 1, 
                                       p=[watched_prob, 1-watched_prob])[0]
            if watched:
                first_date = random_date("2022-04-01", "2023-05-30")
                details = {
                    'first_date': first_date,
                    'last_date': random_date(first_date, "2023-05-31"),
                    'minute': np.random.randint(0, 100),
                    'times': np.random.choice(list(range(1,5)), p=[0.7, 0.15, 0.13, 0.02])
                    }
                create_watched_relationship(profile['user'], profile['name'], movie, details)
                pr = rated_prob * 1.8
                pf = feedback_prob * 2.2
            else:
                pr = rated_prob
                pf = feedback_prob
                
            rated = np.random.choice([True, False], p=[pr, 1-pr])
            
            if rated:
                rating = np.random.choice(list(range(1, 11)), 
                                          p=[0.1, 0.025, 0.025, 0.05, 0.075, 
                                             0.125, 0.2, 0.2, 0.1, 0.1])
                create_rated_relationship(profile['user'], profile['name'], movie, rating)
                
                pf = pf * 1.2
                feedback = np.random.choice([True, False], p=[pf, 1-pf])
                
                if feedback:
                    if rating >= 6:
                        create_liked_relationship(profile['user'], profile['name'], movie)
                    elif rating < 6:
                        create_disliked_relationship(profile['user'], profile['name'], movie)             
            else:
                feedback = np.random.choice([True, False], p=[pf, 1-pf])
                if feedback:
                    liked = np.random.choice([True, False], p=[0.6, 0.4])
                    if liked:
                        create_liked_relationship(profile['user'], profile['name'], movie)
                    else:
                        create_disliked_relationship(profile['user'], profile['name'], movie)

def follow_relationships(profiles, persons):
    for profile in profiles:
        print(profile)
        follow_prob = np.random.uniform(0.02, 0.1)
        for person in persons:
            follow = np.random.choice([True, False],p=[follow_prob, 1-follow_prob])
            if follow:
                create_follow_relationship(profile['user'], profile['name'], person)

def watch_later_relationships(profiles, movies):
    for profile in profiles:
        print(profile)
        wl_prob = np.random.uniform(0.05, 0.15)
        for movie in movies:
            watch_later = np.random.choice([True, False], p=[wl_prob, 1-wl_prob])
            if watch_later:
                create_watch_later_relationship(profile['user'], profile['name'], movie)

def get_profile_ids():
    with driver.session() as session:
        # Define the Cypher query to retrieve the IDs of Profile nodes
        query = "MATCH (p:Profile) RETURN ID(p) AS id"

        # Execute the Cypher query
        result = session.run(query)

        # Extract the IDs from the result and store them in a Python list
        profile_ids = [record["id"] for record in result]

    # Return the list of profile IDs
    return profile_ids

def get_movie_ids():
    with driver.session() as session:
        # Define the Cypher query to retrieve the IDs of Profile nodes
        query = "MATCH (m:Movie) RETURN ID(m) AS id"

        # Execute the Cypher query
        result = session.run(query)

        # Extract the IDs from the result and store them in a Python list
        movie_ids = [record["id"] for record in result]

    # Return the list of profile IDs
    return movie_ids

def create_graph():
    # Connect to the Neo4j database
    graph = Graph(uri, auth=(username, password))
    
    # Cypher query to retrieve all nodes and relationships from the database
    query = """
    MATCH (n)
    OPTIONAL MATCH (n)-[r]->(m)
    WHERE TYPE(r) <> 'DISLIKED'
      AND TYPE(r) <> 'OWNS'
      AND (TYPE(r) <> 'RATED' OR r.rating >= 7)
    WITH n, r, m, COUNT(r) AS relationshipCount
    WHERE relationshipCount > 0
    RETURN n, r, m
    """
    result = graph.run(query)
    
    # Create a NetworkX graph
    networkx_graph = nx.Graph()
    
    # Iterate over the result and add nodes to the NetworkX graph
    for record in result:
        print(f"Number of nodes: {networkx_graph.number_of_nodes()}")
        print(f"Number of edges: {networkx_graph.number_of_edges()}")
        start_node = record["n"]
        relationship = record["r"]
        end_node = record["m"]
        
        start_node_id = start_node.identity
        end_node_id = end_node.identity
        relationship_type = relationship.type
        relationship_properties = dict(relationship)
        
        # Add the start and end nodes to the NetworkX graph
        networkx_graph.add_node(start_node_id, **dict(start_node))
        networkx_graph.add_node(end_node_id, **dict(end_node))
        
        # Add the relationship to the NetworkX graph
        networkx_graph.add_edge(start_node_id, end_node_id, type=relationship_type, **relationship_properties)
    
    print(f"Number of nodes: {networkx_graph.number_of_nodes()}")
    print(f"Number of edges: {networkx_graph.number_of_edges()}")
    
    return networkx_graph

def create_recommendations():
    profile_ids = get_profile_ids()
    
    movie_ids = get_movie_ids()
    
    G = create_graph()
    
    for profile_id in profile_ids:
        pairs = []
        for movie_id in movie_ids:
            pairs.append((profile_id, movie_id))
        jacard_scores = nx.jaccard_coefficient(G, pairs)
        scores = []
        for i in range(len(pairs)):
            try:
                scores.append(next(jacard_scores))
                print(scores[i])
            except:
                scores.append((profile_id, movie_ids[i], 0))
            
        scores.sort(key=lambda x: x[2], reverse=True)
        top_scores = scores[:10]
        set_recommendations(profile_id, [x[1] for x in top_scores])
        