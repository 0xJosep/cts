"use client";

import { useTranslation } from "@/lib/i18n/TranslationContext";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedTestimonials } from "@/src/components/ui/animated-testimonials";

export default function AboutPage() {
  const { t } = useTranslation();

  const teamMembers = [
    {
      name: t("about.team.founder.name"),
      role: t("about.team.founder.role"),
      description: t("about.team.founder.description"),
      image: "/chauffeur-showcase.jpeg",
    },
    {
      name: t("about.team.operations.name"),
      role: t("about.team.operations.role"),
      description: t("about.team.operations.description"),
      image: "/chauffeur-showcase-2.jpeg",
    },
    {
      name: t("about.team.customer.name"),
      role: t("about.team.customer.role"),
      description: t("about.team.customer.description"),
      image: "/chauffeur-showcase.jpeg",
    },
  ];

  const values = [
    {
      title: t("about.values.excellence.title"),
      description: t("about.values.excellence.description"),
      icon: "⭐",
    },
    {
      title: t("about.values.integrity.title"),
      description: t("about.values.integrity.description"),
      icon: "🤝",
    },
    {
      title: t("about.values.innovation.title"),
      description: t("about.values.innovation.description"),
      icon: "🚀",
    },
    {
      title: t("about.values.sustainability.title"),
      description: t("about.values.sustainability.description"),
      icon: "🌱",
    },
  ];

  const testimonials = [
    {
      quote: t("home.testimonials.sarah.quote"),
      name: t("home.testimonials.sarah.name"),
      designation: t("home.testimonials.sarah.title"),
      src: "/circular-gallery/marrakech.jpg",
    },
    {
      quote: t("home.testimonials.michael.quote"),
      name: t("home.testimonials.michael.name"),
      designation: t("home.testimonials.michael.title"),
      src: "/circular-gallery/fes.jpg",
    },
    {
      quote: t("home.testimonials.elena.quote"),
      name: t("home.testimonials.elena.name"),
      designation: t("home.testimonials.elena.title"),
      src: "/circular-gallery/chefchaouen.jpg",
    },
    {
      quote: t("home.testimonials.david.quote"),
      name: t("home.testimonials.david.name"),
      designation: t("home.testimonials.david.title"),
      src: "/circular-gallery/merzouga.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-gold/5 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="outline" className="mb-6 border-gold text-gold">
              {t("about.hero.badge")}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              {t("about.hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {t("about.hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold hover:bg-gold-dark">
                <Link href="/contact">{t("about.hero.contactUs")}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">{t("about.hero.ourServices")}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t("about.story.title")}
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>{t("about.story.paragraph1")}</p>
                <p>{t("about.story.paragraph2")}</p>
                <p>{t("about.story.paragraph3")}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/cars-showcase-close.jpeg"
                alt="Luxury vehicle"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-gold text-primary-foreground p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">20+</div>
                <div className="text-sm opacity-90">{t("about.story.yearsExperience")}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("about.mission.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("about.mission.subtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-gold/20 hover:border-gold transition-colors">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold mb-4">{t("about.mission.ourMission")}</h3>
                  <p className="text-muted-foreground">{t("about.mission.missionText")}</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-gold/20 hover:border-gold transition-colors">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">👁️</div>
                  <h3 className="text-2xl font-bold mb-4">{t("about.mission.ourVision")}</h3>
                  <p className="text-muted-foreground">{t("about.mission.visionText")}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("about.values.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("about.values.subtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("about.team.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("about.team.subtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <Badge variant="outline" className="mb-3 border-gold text-gold">
                      {member.role}
                    </Badge>
                    <p className="text-muted-foreground text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("about.testimonials.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("about.testimonials.subtitle")}
            </p>
          </div>
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gold/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("about.cta.title")}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t("about.cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold hover:bg-gold-dark">
                <Link href="/booking">{t("about.cta.bookNow")}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">{t("about.cta.getInTouch")}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 