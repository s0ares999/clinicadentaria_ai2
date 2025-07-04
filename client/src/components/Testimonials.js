import React from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

const TestimonialsContainer = styled.section`
  padding: 5rem 2rem;
  background-color: #ffffff;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2c3e50;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const TestimonialCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 370px;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transform: translateY(${props => (props.isVisible ? 0 : 30)}px);
  transition: opacity 1s ease, transform 1s ease;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TestimonialTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: 1.5rem;
  color: #34495e;
  line-height: 1.6;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url(\${props => props.image});
  background-size: cover;
  background-position: center;
  margin-right: 1rem;
`;

const AuthorInfo = styled.div`
  h4 {
    margin: 0;
    color: #2c3e50;
  }

  p {
    margin: 0;
    color: #7f8c8d;
    font-size: 0.9rem;
  }
`;

const Rating = styled.div`
  color: #f1c40f;
  margin-top: 0.5rem;
`;

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      text: "Os profissionais da Clínica Dentária são excepcionais! Trataram do meu medo de dentista com muita paciência e finalmente consegui fazer o tratamento que precisava há anos.",
      author: "Maria Silva",
      role: "Professora",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5
    },
    {
      id: 2,
      text: "Excelente atendimento e profissionais altamente qualificados. Fiz um implante e o resultado superou as minhas expectativas. Recomendo a todos!",
      author: "João Santos",
      role: "Engenheiro",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5
    },
    {
      id: 3,
      text: "Meus filhos adoram ir à Clínica Dentária. O ambiente é acolhedor e os dentistas sabem como lidar com crianças. Isso faz toda a diferença!",
      author: "Ana Oliveira",
      role: "Contabilista",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 4
    }
  ];

  return (
    <TestimonialsContainer>
      <SectionTitle>O Que Nossos Pacientes Dizem</SectionTitle>
      <TestimonialsGrid>
        {testimonials.map(testimonial => (
          <TestimonialWithAnimation key={testimonial.id}>
            <TestimonialCard isVisible={true}>
              <TestimonialTitle>{testimonial.author}</TestimonialTitle>
              <TestimonialText>{testimonial.text}</TestimonialText>
              <TestimonialAuthor>
                <AuthorAvatar image={testimonial.avatar} />
                <AuthorInfo>
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.role}</p>
                  <Rating>
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={`fas fa-star${i >= testimonial.rating ? '-o' : ''}`}
                      ></i>
                    ))}
                  </Rating>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
          </TestimonialWithAnimation>
        ))}
      </TestimonialsGrid>
    </TestimonialsContainer>
  );
}

// Componente para animação de entrada e saída nos testemunhos
const TestimonialWithAnimation = ({ children }) => {
  const { ref, inView } = useInView({
    threshold: 0.3, // Quando 10% do elemento está visível
    triggerOnce: false, // Para que a animação ocorra várias vezes
  });

  return (
    <div ref={ref}>
      {React.cloneElement(children, { isVisible: inView })}
    </div>
  );
};

export default Testimonials;
