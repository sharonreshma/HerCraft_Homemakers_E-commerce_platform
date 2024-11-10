import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { FaRegEdit, FaCalendarAlt, FaStar, FaHeart } from 'react-icons/fa';

// Import images directly
import blog1 from '../assets/blog1.jpg';
import blog2 from '../assets/blog2.jpg';
import blog3 from '../assets/blog3.jpg';
import blog4 from '../assets/blog4.png';
import blog5 from '../assets/blog5.webp';
import blog6 from '../assets/blog6.jpeg';
import blog7 from '../assets/blog7.jpg';
import blog8 from '../assets/blog8.jpg';
import blog9 from '../assets/blog9.jpg';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } });

  useEffect(() => {
    axios.get('http://localhost:8080/api/posts')
      .then(response => {
        setBlogs(response.data);
        // Initialize liked posts state
        const initialLikes = response.data.reduce((acc, blog) => {
          acc[blog.id] = false;
          return acc;
        }, {});
        setLikedPosts(initialLikes);
      })
      .catch(error => console.error('Error fetching blog posts:', error));
  }, []);

  const handleLikeClick = (postId) => {
    setLikedPosts(prevState => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };

  const latestPosts = blogs.slice(0, 3);
  const popularPosts = blogs.slice(3, 6);
  const newPosts = blogs.slice(6, 14);

  return (
    <Container>
      <Header>
        <Title>Discover the Best in Handcrafted Goods</Title>
        <Subtitle>Explore our latest and most popular blog posts</Subtitle>
      </Header>
      <Main>
        <animated.div style={fadeIn}>
          <Section>
            <SectionHeader>
              <FaRegEdit style={{ marginRight: '10px', color: '#FFCCCC' }} /> Latest Posts
            </SectionHeader>
            <BlogGrid>
              {latestPosts.map(post => (
                <BlogPost key={post.id}>
                  <PostImage src={post.image || blog1} alt={post.title} />
                  <PostTitle>{post.title}</PostTitle>
                  <PostMeta>
                    <FaCalendarAlt /> {post.date}
                  </PostMeta>
                  <AuthorMeta>By {post.author}</AuthorMeta>
                  <PostContent>{post.content}</PostContent>
                  <ActionContainer>
                    <LikeButton
                      liked={likedPosts[post.id]}
                      onClick={() => handleLikeClick(post.id)}
                    >
                      <FaHeart />
                    </LikeButton>
                    <ReadMoreButton href="/blog-post">Read More</ReadMoreButton>
                  </ActionContainer>
                </BlogPost>
              ))}
            </BlogGrid>
          </Section>
        </animated.div>
        <animated.div style={fadeIn}>
          <Aside>
            <AsideHeader>
              <FaStar style={{ marginRight: '10px', color: '#FFCCCC' }} /> Popular Posts
            </AsideHeader>
            <BlogGrid>
              {popularPosts.map(post => (
                <BlogPost key={post.id}>
                  <PostImage src={post.image || blog9} alt={post.title} />
                  <PostTitle>{post.title}</PostTitle>
                  <PostMeta>
                    <FaCalendarAlt /> {post.date}
                  </PostMeta>
                  <AuthorMeta>By {post.author}</AuthorMeta>
                  <PostContent>{post.content}</PostContent>
                  <ActionContainer>
                    <LikeButton
                      liked={likedPosts[post.id]}
                      onClick={() => handleLikeClick(post.id)}
                    >
                      <FaHeart />
                    </LikeButton>
                    <ReadMoreButton href="/blog-post1">Read More</ReadMoreButton>
                  </ActionContainer>
                </BlogPost>
              ))}
            </BlogGrid>
          </Aside>
        </animated.div>
        <animated.div style={fadeIn}>
          <Section>
            <SectionHeader>
              <FaRegEdit style={{ marginRight: '10px', color: '#FFCCCC' }} /> Our Blogs
            </SectionHeader>
            <BlogGrid>
              {newPosts.map(post => (
                <BlogPost key={post.id}>
                  <PostImage src={post.image || blog7} alt={post.title} />
                  <PostTitle>{post.title}</PostTitle>
                  <PostMeta>
                    <FaCalendarAlt /> {post.date}
                  </PostMeta>
                  <AuthorMeta>By {post.author}</AuthorMeta>
                  <PostContent>{post.content}</PostContent>
                  <ActionContainer>
                    <LikeButton
                      liked={likedPosts[post.id]}
                      onClick={() => handleLikeClick(post.id)}
                    >
                      <FaHeart />
                    </LikeButton>
                    <ReadMoreButton href="/blog-post2">Read More</ReadMoreButton>
                  </ActionContainer>
                </BlogPost>
              ))}
            </BlogGrid>
          </Section>
        </animated.div>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  padding: 35px;
  margin-right: 10px;
  background-color: #f4f4f4;
  min-height: 100vh;
`;

const Header = styled.header`
  text-align: center;
  padding: 40px 20px;
  background-color: #FFCCCC;
  color: black;
  border-bottom: 1px solid #ddd;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  font-family: 'Georgia', serif;
`;

const Subtitle = styled.h2`
  font-size: 1.2rem;
  color: grey;
  margin: 10px 0 0;
  font-family: 'Georgia', serif;
`;

const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
`;

const Section = styled.section`
  flex: 3;
  
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 50px;
  margin-right: 1px;
  margin-bottom: 20px;
`;

const SectionHeader = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;


const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin-right:20px;
  gap: 20px;
`;

const BlogPost = styled.article`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(255, 204, 204, 0.5);
  padding: 15px;
`;

const PostImage = styled.img`
  width: 100%;
  height:200px;
  border-radius: 8px;
`;

const PostTitle = styled.h3`
  font-size: 1.5rem;
  margin: 10px 0;
  color: #333;
`;

const PostMeta = styled.div`
  font-size: 0.9rem;
  color: grey;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const AuthorMeta = styled.div`
  font-size: 0.8rem;
  color: grey;
  margin-bottom: 10px;
`;

const PostContent = styled.p`
  font-size: 1rem;
  color: #666;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LikeButton = styled.button`
  background: ${(props) => (props.liked ? 'transparent' : 'transparent')};
  border: none;
  color: ${(props) => (props.liked ? '#FFCCCC' : 'grey')};
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s, background 0.3s;
  
  &:hover {
    color: #FFCCCC;
    background: ${(props) => (props.liked ? 'transparent' : 'transparent')};
  }
`;


const ReadMoreButton = styled.a`
  background-color: #FFCCCC;
  color: black;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-size: 0.9rem;
 
  &:hover {
    background-color: #000;
    color: #ffcccc;
  }
`;

const Aside = styled.aside`
  flex: 3;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  margin-bottom: 20px;
`;

const AsideHeader = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

export default BlogPage;
