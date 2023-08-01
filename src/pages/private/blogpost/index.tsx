"use client";
import React from "react";
import { useParams } from "next/navigation";
import { styled } from "styled-components";
import BlogActions from "./_molecules/BlogActions";
import AboutAuthor from "./_molecules/AboutAuthor";
import { device } from "@/styles/utils.styled";
import RelatedPost from "../_molecules/RelatedPost";

const BlogPost = () => {
  const params = useParams();

  return (
    <BlogPostContainer>
      <InnerContainer>
        <div>
          <Heading>
            <h1>
              Thank You to America’s Librarians for Protecting Our Freedom to
              Read{" "}
            </h1>
            <Author>
              <ImageContainer></ImageContainer>
              <PublishInfo>
                <div>
                  <h4>Barrack Obama</h4>
                  <span>﹒</span>
                  <p>Follow</p>
                </div>
                <div>
                  <p>4 min read</p>
                  <span>﹒</span>
                  <p>Jul 17</p>
                </div>
                <></>
              </PublishInfo>
            </Author>
            <BlogActions />
          </Heading>
          <Content>
            <Figure>
              <div></div>
              <figcaption>Graphic credit: Prince Nwakanma</figcaption>
            </Figure>
            <BodyContent>
              <p>To the dedicated and hardworking librarians of America:</p>
              <p>
                In any democracy, the free exchange of ideas is an important
                part of making sure that citizens are informed, engaged and feel
                like their perspectives matter.
              </p>
              <p>
                It’s so important, in fact, that here in America, the First
                Amendment of our Constitution states that freedom begins with
                our capacity to share and access ideas — even, and maybe
                especially, the ones we disagree with.
              </p>
              <p>
                More often than not, someone decides to write those ideas down
                in a book.
              </p>
              <p>
                Books have always shaped how I experience the world. Writers
                like Mark Twain and Toni Morrison, Walt Whitman and James
                Baldwin taught me something essential about our country’s
                character. Reading about people whose lives were very different
                from mine showed me how to step into someone else’s shoes. And
                the simple act of writing helped me develop my own identity —
                all of which would prove vital as a citizen, as a community
                organizer, and as president.
              </p>
              <p>
                Today, some of the books that shaped my life — and the lives of
                so many others — are being challenged by people who disagree
                with certain ideas or perspectives. It’s no coincidence that
                these “banned books” are often written by or feature people of
                color, indigenous people, and members of the LGBTQ+ community —
                though there have also been unfortunate instances in which books
                by conservative authors or books containing “triggering” words
                or scenes have been targets for removal. Either way, the impulse
                seems to be to silence, rather than engage, rebut, learn from or
                seek to understand views that don’t fit our own.
              </p>
              <p>
                I believe such an approach is profoundly misguided, and contrary
                to what has made this country great. As I’ve said before, not
                only is it important for young people from all walks of life to
                see themselves represented in the pages of books, but it’s also
                important for all of us to engage with different ideas and
                points of view.
              </p>
              <p>
                It’s also important to understand that the world is watching. If
                America — a nation built on freedom of expression — allows
                certain voices and ideas to be silenced, why should other
                countries go out of their way to protect them? Ironically, it is
                Christian and other religious texts — the sacred texts that some
                calling for book bannings in this country claim to want to
                defend — that have often been the first target of censorship and
                book banning efforts in authoritarian countries.
              </p>
              <p>
                Nobody understands that more than you, our nation’s librarians.
                In a very real sense, you’re on the front lines — fighting every
                day to make the widest possible range of viewpoints, opinions,
                and ideas available to everyone. Your dedication and
                professional expertise allow us to freely read and consider
                information and ideas, and decide for ourselves which ones we
                agree with.
              </p>
              <p>
                That’s why I want to take a moment to thank all of you for the
                work you do every day — work that is helping us understand each
                other and embrace our shared humanity.
              </p>
              <p>
                And it’s not just about books. You also provide spaces where
                people can come together, share ideas, participate in community
                programs, and access essential civic and educational resources.
                Together, you help people become informed and active citizens,
                capable of making this country what they want it to be.
              </p>
              <p>
                And you do it all in a harsh political climate where, all too
                often, you’re attacked by people who either cannot or will not
                understand the vital — and uniquely American — role you play in
                the life of our nation.
              </p>
              <p>
                So whether you just started working at a school or public
                library, or you’ve been there your entire career, Michelle and I
                want to thank you for your unwavering commitment to the freedom
                to read. All of us owe you a debt of gratitude for making sure
                readers across the country have access to a wide range of books,
                and all the ideas they contain.
              </p>
              <p>
                Finally, to every citizen reading this, I hope you’ll join me in
                reminding anyone who will listen — and even some people you
                think might not — that the free, robust exchange of ideas has
                always been at the heart of American democracy. Together, we can
                make that true for generations to come.
              </p>
              <p>With gratitude,</p>
              <p>Barack</p>
            </BodyContent>
          </Content>
        </div>
        <BlogActions noBorder noViews />
      </InnerContainer>
      <ExtraContainer>
        <AboutAuthor />
        <RelatedPost />
      </ExtraContainer>
    </BlogPostContainer>
  );
};

export default BlogPost;

const BlogPostContainer = styled.div`
  padding: 4.8rem 8.4rem;
  width: 100%;

  ${() => device.down("sm")} {
    padding: 2.4rem;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 68rem;
  margin: 0 auto;
  gap: 6rem;
  padding-bottom: 9rem;
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;

  h1 {
    font-size: 3.8rem;
    font-weight: 700;
  }
`;

const Author = styled.div`
  display: flex;
  gap: 2.4rem;
`;

const ImageContainer = styled.div`
  height: 4.4rem;
  width: 4.4rem;
  border-radius: 50%;
  background: #d9d9d9;
`;

const PublishInfo = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    display: flex;

    h4 {
      font-size: 1.5rem;
      font-weight: 500;
    }

    span {
      font-size: 1.8rem;
    }

    p {
      font-size: 1.5rem;
    }
  }

  > div:first-child {
    p {
      color: var(--tertiary-rgb);
    }
  }
  > div:last-child {
    p {
      color: var(--small-dim-rgb);
    }
  }
`;

const Content = styled.div`
  width: 100%;
  padding-top: 6.4rem;
`;

const Figure = styled.figure`
  width: 100%;

  > div {
    width: 100%;
    height: 38rem;
    background: #d9d9d9;
  }

  & figcaption {
    max-width: 72.8rem;
    width: 100%;
    font-size: 1.4rem;
    color: var(--small-dim-rgb);
    margin: 1rem auto;
    text-align: center;
  }
`;

const BodyContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.6rem;

  & p {
    word-break: break-word;
    color: #242424;
    font-weight: 400;
  }
`;

const ExtraContainer = styled.div`
  max-width: 68rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 6rem;
`;
